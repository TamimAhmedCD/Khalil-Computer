import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { collection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

// Zod schemas for validation
const updateProviderSchema = z.object({
  provider: z.string().min(2, "Provider name must be at least 2 characters").optional(),
  model: z.string().min(2, "Model name must be at least 2 characters").optional(),
  type: z.string().min(2, "Type must be at least 2 characters").optional(),
  apiKey: z.string().min(5, "API key must be at least 5 characters").optional(),
  endpoint: z.string().url("Endpoint must be a valid URL").optional(),
  priority: z.number().min(1).max(99).optional(),
  freeTier: z.boolean().optional(),
  status: z.enum(["active", "inactive", "testing"]).optional(),
  notes: z.string().optional(),
});

// Get single AI provider
export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid provider ID" }, { status: 400 });
    }

    const db = await collection("aiProviders");
    const provider = await db.findOne({ _id: new ObjectId(id) });

    if (!provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      provider: {
        ...provider,
        _id: provider._id.toString(),
        // Hide API key for security
        apiKey: provider.apiKey ? "**********" + provider.apiKey.slice(-4) : null
      }
    });
  } catch (error) {
    console.error("Get AI provider error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update AI provider
export async function PUT(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid provider ID" }, { status: 400 });
    }

    const body = await req.json();
    const validatedData = updateProviderSchema.parse(body);

    const db = await collection("aiProviders");

    // Check if provider exists
    const existing = await db.findOne({ _id: new ObjectId(id) });
    if (!existing) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    // Prepare update
    const updateData = {
      ...validatedData,
      updatedAt: new Date(),
      updatedBy: session.user.email || "system",
    };

    // If updating API key, keep old one if not provided
    if (!updateData.apiKey && existing.apiKey) {
      delete updateData.apiKey;
    }

    const result = await db.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    // Get updated provider
    const updatedProvider = await db.findOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      provider: {
        ...updatedProvider,
        _id: updatedProvider._id.toString(),
        apiKey: "**********" + (updatedProvider.apiKey?.slice(-4) || "")
      },
      message: "Provider updated successfully"
    });
  } catch (error) {
    console.error("Update AI provider error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete AI provider
export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid provider ID" }, { status: 400 });
    }

    const db = await collection("aiProviders");

    // Check if provider exists
    const existing = await db.findOne({ _id: new ObjectId(id) });
    if (!existing) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    // Check if this is the only active provider
    const activeProviders = await db.countDocuments({
      status: "active",
      _id: { $ne: new ObjectId(id) }
    });

    if (activeProviders === 0) {
      return NextResponse.json({
        error: "Cannot delete the only active provider. Add another provider first or mark this as inactive.",
      }, { status: 400 });
    }

    const result = await db.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Provider deleted successfully"
    });
  } catch (error) {
    console.error("Delete AI provider error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Test AI provider
export async function POST(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid provider ID" }, { status: 400 });
    }

    const db = await collection("aiProviders");
    const provider = await db.findOne({ _id: new ObjectId(id) });

    if (!provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    // Test the provider
    let testResult = null;
    const testPrompt = "Hello, this is a test from Khalil Computer blog system. Please respond with 'AI Service Working' if you can see this message.";

    try {
      if (provider.type === "gemini") {
        const response = await fetch(
          `${provider.endpoint}?key=${provider.apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: testPrompt }] }],
              generationConfig: {
                maxOutputTokens: 100,
                temperature: 0.7,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          testResult = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
        }
      } else if (provider.type === "openrouter") {
        const response = await fetch(provider.endpoint, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${provider.apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://khalil-computer.com",
            "X-Title": "Khalil Computer Blog Admin",
          },
          body: JSON.stringify({
            model: provider.model,
            messages: [{ role: "user", content: testPrompt }],
            max_tokens: 100,
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          testResult = data.choices?.[0]?.message?.content || "No response";
        }
      }

      // Update provider status based on test
      const status = testResult?.includes("AI Service Working") ? "active" : "testing";

      await db.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            status: status,
            lastTested: new Date(),
            testResult: testResult?.substring(0, 100),
            updatedAt: new Date(),
            updatedBy: session.user.email || "system",
          }
        }
      );

      return NextResponse.json({
        success: true,
        testResult: testResult,
        status: status,
        message: `Provider tested: ${testResult ? "Working" : "Failed"}`
      });
    } catch (testError) {
      console.error("Test error:", testError);

      await db.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            status: "inactive",
            lastTested: new Date(),
            testResult: "Test failed: " + testError.message,
            updatedAt: new Date(),
            updatedBy: session.user.email || "system",
          }
        }
      );

      return NextResponse.json({
        success: false,
        testResult: testError.message,
        status: "inactive",
        message: "Provider test failed"
      }, { status: 400 });
    }
  } catch (error) {
    console.error("Test AI provider error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
