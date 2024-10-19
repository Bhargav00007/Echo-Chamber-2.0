import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// TypeScript assertion to tell the compiler the type of global._mongoose
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Cast global._mongoose as MongooseCache or initialize it
const cached = (global as typeof global & { _mongoose: MongooseCache })
  ._mongoose || { conn: null, promise: null };

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

// Assign the updated cached object back to the global scope
(global as typeof global & { _mongoose: MongooseCache })._mongoose = cached;

export default dbConnect;
