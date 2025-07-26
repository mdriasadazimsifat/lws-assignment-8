import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "model"],
    required: true,
  },
  sessionId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
export default Message;
