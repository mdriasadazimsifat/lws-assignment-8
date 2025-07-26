import connectMongo from "@/app/lib/dbConnect/connectMongo";
import { Conversation } from "@/app/lib/models/Conversation";
import Message from "@/app/lib/models/Message";
import replaceArrayId from "@/app/utils/replaceArrayId";
import { revalidatePath } from "next/cache";

export async function GET(req, { params }) {
  const { conversationId } = await params;

  try {
    await connectMongo();
    const messages = await Message.find({ sessionId: conversationId }).lean();
    const conversation = await Conversation.findById(conversationId);
    const replaceIdInArray = replaceArrayId(messages);

    return new Response(
      JSON.stringify({ messages: replaceIdInArray, title: conversation.title }),
      {
        status: 200,
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ status: "fail", message: "There was an error" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { conversationId } = await params;

  try {
    await connectMongo();
    await Conversation.findByIdAndDelete(conversationId);
    await Message.deleteMany({ sessionId: conversationId });
    revalidatePath("/");
    return new Response(
      JSON.stringify({ status: "success", message: "conversation deleted" }),
      { status: 500 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ status: "fail", message: e.message }),
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const { conversationId } = await params;
  const { title } = await req.json();

  try {
    await connectMongo();
    await Conversation.findByIdAndUpdate(conversationId, { title: title });

    return new Response(
      JSON.stringify({
        status: "success",
        message: "conversation rename success",
      }),
      { status: 500 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ status: "fail", message: e.message }),
      { status: 500 }
    );
  }
}
