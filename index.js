const express = require("express");
const cors = require("cors");
const womenClothesRoute = require("./routes/womenClothesRoute");

const app = express();
const allowedOrigins = [
  "http://localhost:5173", // Vite dev
  "https://zayrahbymanan.vercel.app", // Production
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/women-clothes", womenClothesRoute);

const stripeRoute = require("./routes/stripeRoute");
app.use("/api", stripeRoute);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
