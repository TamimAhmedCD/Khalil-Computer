"use client";
import { logoutAction } from "@/app/actions/logoutAction";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React from "react";

export default function DashboardPage() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <h1 className="text-3xl font-montserrat font-bold">Hey Welcome Back</h1>
      {session && <Button onClick={() => logoutAction()}>Logout</Button>}
    </div>
  );
}
