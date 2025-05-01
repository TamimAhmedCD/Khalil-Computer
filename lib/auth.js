import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Credentials from "next-auth/providers/credentials"; // Not Credential, must be Credentials
import bcrypt from "bcrypt";
import client from "./mongodb";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ email, password }) {
        if (!email || !password) {
          throw new Error("ইমেইল এবং পাসওয়ার্ড দিতে হবে।");
        }
        const db = client.db("khalil_computer");
        const user = await db.collection("users").findOne({ email });
        if (!user) {
          throw new Error("ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  secret: process.env.AUTH_SECRET,
});
