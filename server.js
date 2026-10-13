const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

// Initialize the Google Generative AI client with the API key from environment variables
const ai = new GoogleGenAI({
  apiKey: process.env.GENERATIVE_AI_API_KEY,
});

// Define the model to use for generating content. Update this to a newer supported model if needed.
const MODEL = "gemini-3.6-flash";

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({
      error: "A valid prompt is required",
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });

    res.json({ response: response.text });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).send("Error generating content");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
