import mongoose, { Document, Schema, model, models } from "mongoose";

// Define the message interface
export interface IMessage extends Document {
  userId: string;
  userName: string;
  userImage: string;
  content: string;
  createdAt: Date;
}

// Create the message schema
const messageSchema = new Schema<IMessage>({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userImage: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Correctly export the model
const Message = models.Message || model<IMessage>("Message", messageSchema);

export default Message;
