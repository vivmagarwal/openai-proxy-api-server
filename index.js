const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Set up CORS to restrict requests to specific domains
const allowedOrigins = [
  "https://luxury-griffin-3e8f2f.netlify.app",
  "https://main--poetic-tanuki-765674.netlify.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Set up a proxy for requests to the OpenAI API
const openaiProxy = createProxyMiddleware({
  target: "https://api.openai.com",
  changeOrigin: true,
  pathRewrite: { "^/openai-chat": "/v1/chat/completions" },
  headers: {
   "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
  },
});

app.use("/openai-chat", openaiProxy);

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
