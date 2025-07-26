"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectMongo from "../lib/dbConnect/connectMongo";
import { generateConversationTitle } from "../lib/gemini/generateTitle";
import { Conversation } from "../lib/models/Conversation";
import Message from "../lib/models/Message";
import replaceId from "../utils/replaceId";

export async function createConversation(prompt, formDate) {
  let updateId;
  try {
    await connectMongo();
    const title = await generateConversationTitle(prompt);
    const conversation = await Conversation.create({
      title,
    });
    updateId = replaceId(conversation);
    await Message.create({
      role: "user",
      content: prompt,
      sessionId: updateId.id,
    });
  } catch (e) {
    //
  }
  if (updateId?.id) {
    redirect(`/conversation/${updateId.id}`);
  }
}
export async function deleteConversation(conversationId) {
  try {
    await connectMongo();
    await Conversation.findByIdAndDelete(conversationId);

    await Message.deleteMany({
      sessionId: conversationId,
    });

    revalidatePath("/");
  } catch (e) {}
}
export async function updateTitle(conversationId, title) {
  try {
    await connectMongo();
    await Conversation.findByIdAndUpdate(conversationId, { title });
    revalidatePath("/");
  } catch (e) {}
}
