import Stripe from "stripe";
import Booking from "../models/Booking.js";

// Stripe instance with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// API to handle Stripe webhooks
export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verify using the webhook signing secret (whsec_...)
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOKS_SECRET   // 👈 using STRIPE_WEBHOOKS_SECRET
    );
    console.log("Stripe webhook event received:", event.type);
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Read bookingId from metadata
      const bookingId = session.metadata?.bookingId;
      if (!bookingId) {
        console.error("No bookingId found in metadata");
        return res.status(400).json({ error: "No bookingId found in metadata" });
      }

      // Mark booking as paid
      const updateResult = await Booking.findByIdAndUpdate(
        bookingId,
        { isPaid: true, paymentMethod: "Stripe" },
        { new: true }
      );
      console.log("Booking updated successfully:", updateResult);
    } else {
      console.log("Unhandled event type:", event.type);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("Error handling webhook:", err);
    res.status(500).json({ error: "Error handling webhook" });
  }
};
