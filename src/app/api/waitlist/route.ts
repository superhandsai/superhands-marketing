import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { notifyWaitlistSignup } from "@/lib/services/slack";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ email });

    if (insertError) {
      if (insertError.code === "23505") {
        // Duplicate email - still return success for UX
        return NextResponse.json({ success: true, duplicate: true });
      }
      console.error("Waitlist insert error:", insertError);
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    // Send Slack notification (non-blocking, don't fail if it errors)
    notifyWaitlistSignup(email).catch((err) => {
      console.error("Failed to send Slack notification:", err);
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
