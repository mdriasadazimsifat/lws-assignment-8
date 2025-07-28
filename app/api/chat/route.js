import buildAiprompt from "@/app/lib/gemini/buildAiprompt";
import Message from "@/app/lib/models/Message";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || "";

if (!API_KEY) {
  throw new Error("API_KEY is not set in environment variables");
}

// create ai instance
const ai = new GoogleGenerativeAI(API_KEY);

// post route handler
export async function POST(req) {
  const body = await req.json();
  const messages = body.messages || [];
  const conversationId = body.conversationId;
  const currentMessage = body.currentMessage;

  try {
    if (body.isSave) {
      await Message.create({ ...currentMessage, sessionId: conversationId });
    }

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContentStream({
      contents: buildAiprompt(messages),
    });

    let streamText = "";

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();

          if (chunkText) {
            streamText += chunkText;
            controller.enqueue(encoder.encode(chunkText));
          }
        }

        controller.close();

        try {
          await Message.create({
            role: "model",
            sessionId: conversationId,
            content: streamText,
          });
        } catch (dbError) {
          //
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        Connection: "keep-alive",
      },
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({ msg: "Failed to get stream from AI.", status: "fail" }),
      { status: 500 }
    );
  }
}
