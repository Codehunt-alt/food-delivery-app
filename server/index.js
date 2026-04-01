const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

// 🔥 MAIN: order route
app.post("/order", (req, res) => {
  const order = req.body;

  console.log("New order:", order);

  // пока просто ответ
  res.json({
    message: "Order received!",
    order,
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
