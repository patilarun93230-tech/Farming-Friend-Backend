import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

router.get("/chat", (req, res) => {
  res.send("AI Route Working");
});

router.post("/chat", async (req, res) => {
  try {
    console.log("KEY =", process.env.GEMINI_API_KEY);
    console.log(
      "KEY LENGTH =",
      process.env.GEMINI_API_KEY?.length
    );

    const { message } = req.body;

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

    const result = await model.generateContent(
      `You are an agriculture expert.
Answer only farming related questions.

Question: ${message}`
    );

    const reply = result.response.text();

    res.json({
      reply,
    });
  } catch (error) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;