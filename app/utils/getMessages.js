export default async function getMessages(conversationId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/conversation/${conversationId}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      return { messages: [], title: "" };
    }

    const result = await response.json();

    return result;
  } catch (e) {
    // console.log(e);
    return { messages: [], title: "" };
  }
}
