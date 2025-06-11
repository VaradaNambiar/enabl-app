const express = require("express");
const cors = require("cors"); 
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 3001; // Node.js backend will run on port 3001

// Allow CORS from your frontend's origin (e.g., where your HTML/CSS/JS is served)
app.use(cors({ origin: ["http://localhost:50078", "http://127.0.0.1:5500"] })); 
app.use(express.json()); // To parse JSON request bodies

const CPP_BACKEND_URL = process.env.CPP_BACKEND_URL || "http://localhost:8080";

// POST /api/posts endpoint
app.post("/api/posts/analyse", async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ message: "Title and body are required" });
  }

  let analysisResult = {};
  try {
    // Call C++ Backend for Analysis
    const cppResponse = await fetch(`${CPP_BACKEND_URL}/analyse_post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: body }),
    });

    if (!cppResponse.ok) {
      const errorText = await cppResponse.text();
      console.error("Error from C++ backend:", cppResponse.status, errorText);
      console.log("C++ Backend URL:", CPP_BACKEND_URL);
      analysisResult = { wordCount: null, keywords: [], sentiments: null };
    } else {
      analysisResult = await cppResponse.json();
    }
    if (!Array.isArray(analysisResult.keywords)) {
      analysisResult.keywords = [];
    }
    res.status(200).json(analysisResult);
  } catch (error) {
    console.error("Failed to connect to C++ backend:", error);
    analysisResult = { wordCount: null, keywords: [], sentiments: null };
  }
});
app.listen(PORT, () => {
  console.log(`Node.js Backend listening on port ${PORT}`);
  console.log(`C++ Backend URL: ${CPP_BACKEND_URL}`);
});
