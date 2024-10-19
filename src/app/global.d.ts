// src/app/global.d.ts
import mongoose from "mongoose";

declare global {
  namespace NodeJS {
    interface Global {
      _mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      };
    }
  }
}

export {}; // Ensure this is included
