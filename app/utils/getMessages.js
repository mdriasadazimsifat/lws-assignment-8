import connectMongo from "../lib/dbConnect/connectMongo";
import { Conversation } from "../lib/models/Conversation";
import Message from "../lib/models/Message";
import replaceArrayId from "./replaceArrayId";

export default async function getMessages(conversationId) {
  try {
    await connectMongo();
    const messages = await Message.find({ sessionId: conversationId }).lean();
    const conversation = await Conversation.findById(conversationId);
    const replaceIdInArray = replaceArrayId(messages);
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/conversation/${conversationId}`,
    //   { cache: "no-store" }
    // );
    // if (!response.ok) {
    //   return { messages: [], title: "" };
    // }

    const result = { messages, title: conversation.title };

    return result;
  } catch (e) {
    // console.log(e);
    return { messages: [], title: "" };
  }
}
