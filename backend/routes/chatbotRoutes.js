require('dotenv').config();
const express = require("express");
const ChatMessage = require("../models/ChatMessage");
const router = express.Router();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const baseReplies = [
  "Hello! How can I help you today?",
  "That sounds interesting — tell me more.",
  "I’m checking that for you now.",
  "Great question! I’ll do my best to answer.",
  "Let’s keep it simple: what’s your next step?"
];

function generateReply(message) {
  const normalized = message.toLowerCase();
  if (normalized.includes("product")) return "Our product suite includes ticketing, FAQ management, feedback collection, and AI chat support.";
  if (normalized.includes("location")) return "Location-aware styling updates your dashboard theme based on your region.";
  if (normalized.includes("translate") || normalized.includes("language")) return "Use the translation selector in the top-right to switch app language instantly.";
  if (normalized.includes("help")) return "I’m here to help! Ask a question about tickets, products, service centers, or support features.";
  return baseReplies[Math.floor(Math.random() * baseReplies.length)];
}

async function getOpenAIReply(message) {
  if (!OPENAI_API_KEY) return null;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful technical support assistant for a service dashboard. Answer clearly and accurately based on the user’s question." },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI error:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (err) {
    console.error("OpenAI request failed:", err.message);
    return null;
  }
}

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required." });
  }

  let reply = await getOpenAIReply(message);
  if (!reply) {
    reply = generateReply(message);
  }

  const chatMessage = new ChatMessage({ userMessage: message, botReply: reply });
  await chatMessage.save();

  res.json({ reply });
});

router.get("/history", async (req, res) => {
  const history = await ChatMessage.find().sort({ createdAt: 1 });
  res.json(history);
});

module.exports = router;
