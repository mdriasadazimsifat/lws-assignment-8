export default function buildAiprompt(messages = []) {
  return messages.map((message) => {
    if (message.role === "user") {
      return {
        role: "user",
        parts: [{ text: message.content }],
      };
    }

    return {
      role: "model",
      parts: [{ text: message.content }],
    };
  });
}
