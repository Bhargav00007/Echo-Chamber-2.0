import mongoose from "mongoose";

const HighscoreSchema = new mongoose.Schema(
  {
    score: { type: Number, required: true },
    username: { type: String, required: true },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

// Ensure the model is exported correctly
const Highscore =
  mongoose.models.Highscore || mongoose.model("Highscore", HighscoreSchema);

export default Highscore;
