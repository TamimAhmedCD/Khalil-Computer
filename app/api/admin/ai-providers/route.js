import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { collection } from "@/lib/mongodb";
import { z } from "zod";

// Zod schemas for validation
const createProviderSchema = z.object({
  provider: z.string().min(2, "Provider name must be at least 2 characters"),
  model: z.string().min(2, "Model name must be at least 2 characters"),
  type: z.string().min(2, "Type must be at least 2 characters"),
  apiKey: z.string().min(5, "API key must be at least 5 characters"),
  endpoint: z.string().url("Endpoint must be a valid URL"),
  priority: z.number().min(1).max(99),
  freeTier: z.boolean().optional(),
  status: z.string().optional(),
  notes: z.string().optional(),
});

const updateProviderSchema = createProviderSchema.partial();

// Get all AI providers
export async function GET(req) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await collection("aiProviders");
    const providers = await db.find({}).toArray();

    return NextResponse.json({
      success: true,
      providers: providers.map(p => ({
        ...p,
        _id: p._id.toString(),
        // Hide API key for security
        apiKey: p.apiKey ? "**********" + p.apiKey.slice(-4) : null
      }))
    });
  } catch (error) {
    console.error("Get AI providers error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create new AI provider
export async function POST(req) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = createProviderSchema.parse(body);

    const db = await collection("aiProviders");

    // Check if similar provider already exists
    const existing = await db.findOne({
      provider: validatedData.provider,
      model: validatedData.model,
      type: validatedData.type,
    });

    if (existing) {
      return NextResponse.json(
        { error: "Provider with same model already exists" },
        { status: 409 }
      );
    }

    const newProvider = {
      ...validatedData,
      status: validatedData.status || "active",
      freeTier: validatedData.freeTier || false,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: session.user.email || "system",
    };

    const result = await db.insertOne(newProvider);

    return NextResponse.json({
      success: true,
      provider: {
        ...newProvider,
        _id: result.insertedId.toString(),
        apiKey: "**********" + validatedData.apiKey.slice(-4)
      },
      message: "AI provider added successfully"
    });
  } catch (error) {
    console.error("Create AI provider error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Bulk update providers (reorder priorities)
export async function PUT(req) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const providers = body.providers;

    if (!Array.isArray(providers)) {
      return NextResponse.json({ error: "Providers must be an array" }, { status: 400 });
    }

    const db = await collection("aiProviders");
    const operations = [];

    for (const provider of providers) {
      if (provider._id) {
        operations.push({
          updateOne: {
            filter: { _id: provider._id },
            update: {
              $set: {
                priority: provider.priority,
                status: provider.status,
                updatedAt: new Date(),
                updatedBy: session.user.email || "system",
              }
            }
          }
        });
      }
    }

    if (operations.length > 0) {
      await db.bulkWrite(operations);
    }

    return NextResponse.json({
      success: true,
      message: "Providers updated successfully"
    });
  } catch (error) {
    console.error("Update AI providers error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
