import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateConversationTitle(message) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Based on the following chat conversation, generate a concise and relevant title (max 50 characters). Focus on the main topic.

    Conversation:
    ${message}

     Title:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.replace(/^"|"$/g, "").trim();
  } catch (e) {
    return "New Conversation";
  }
}
