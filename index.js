const express = require("express");
const cors = require("cors");
const womenClothesRoute = require("./routes/womenClothesRoute");

const app = express();
app.use(
  cors({
    origin: "https://zayrahbymanan.vercel.app",
    credentials: true,
  })
);

app.use("/api/women-clothes", womenClothesRoute);

const stripeRoute = require("./routes/stripeRoute");
app.use("/api", stripeRoute);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.post("/api/create-checkout-session", async (req, res) => {
  const { name, image, price } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name,
              images: [image],
            },
            unit_amount: price * 100, // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://zayrahbymanan.vercel.app/?status=success",
      cancel_url: "https://zayrahbymanan.vercel.app/?status=cancelled",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
