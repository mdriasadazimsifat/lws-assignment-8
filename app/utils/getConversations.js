import connectMongo from "../lib/dbConnect/connectMongo";
import { Conversation } from "../lib/models/Conversation";
import replaceArrayId from "./replaceArrayId";

export default async function getConversations() {
  try {
    await connectMongo();
    const conversations = await Conversation.find().lean();
    return replaceArrayId(conversations);
  } catch (e) {
    console.log(e);
    return [];
  }
}
