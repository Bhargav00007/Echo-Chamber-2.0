import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Declare a custom type for the global object
declare global {
  // Adding an underscore to avoid conflict with other mongoose definitions
  var _mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Use let or const to declare the global variable, not var
const cached = global._mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Assign to global object
global._mongoose = cached;

export default dbConnect;
