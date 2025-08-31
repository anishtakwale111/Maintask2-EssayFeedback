import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { essay } = await req.json();

    // Call Ollama local API
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2:latest",   // <-- UPDATED MODEL NAME
        prompt: `Provide detailed, constructive feedback on this essay:\n\n${essay}`,
        stream: false
      }),
    });

    const data = await response.json();
    return NextResponse.json({ feedback: data.response });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get feedback from Ollama" },
      { status: 500 }
    );
  }
}
