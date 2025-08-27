import Stripe from "stripe";
import Booking from "../models/bookingModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw body (comes from express.raw in server.js)
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Error verifying Stripe webhook:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle event types
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // bookingId was sent as metadata when creating the Checkout Session
      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        await Booking.findByIdAndUpdate(bookingId, { paymentStatus: "paid" });
        console.log(`✅ Booking ${bookingId} marked as PAID`);
      } else {
        console.error("⚠️ No bookingId found in session metadata");
      }
    } catch (err) {
      console.error("❌ Error updating booking payment status:", err);
      return res.status(500).send("Failed to update booking");
    }
  }

  // Respond to Stripe that we received the event
  res.status(200).json({ received: true });
};

