const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Set up CORS to allow all origins
app.use(cors());

// Set up a proxy for requests to the OpenAI API
const openaiProxy = createProxyMiddleware({
  target: "https://api.openai.com",
  changeOrigin: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
  },
});

// Use the proxy for all requests
app.use("*", openaiProxy);

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
