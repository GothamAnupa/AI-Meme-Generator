require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/generate-meme", async (req, res) => {
  try {
    const { context, category } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are an expert meme creator.

Generate funny meme captions.

Return ONLY valid JSON.

{
  "topText":"",
  "bottomText":"",
  "caption":""
}

Rules:
- topText max 8 words
- bottomText max 8 words
- make it funny
- match the category
- no explanation
`
        },
        {
          role: "user",
          content: `
Category: ${category}

Context:
${context}
`
        }
      ],

      temperature: 0.9,
    });

    const result = completion.choices[0].message.content;

    res.send(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate meme"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});