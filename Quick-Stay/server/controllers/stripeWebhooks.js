import Stripe from "stripe";
import Booking from "../models/Booking.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ------------------ API: Stripe Webhook Listener ------------------
export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verify webhook event
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOKS_SECRET
    );
    console.log("✅ Stripe webhook event received:", event.type);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const bookingId = session.metadata?.bookingId;
      if (!bookingId) {
        console.error("❌ No bookingId found in metadata");
        return res.status(400).json({ error: "No bookingId found in metadata" });
      }

      // Update booking
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { isPaid: true, paymentMethod: "Stripe", status: "paid" },
        { new: true }
      );

      if (updatedBooking) {
        console.log("✅ Booking updated successfully:", updatedBooking._id);
      } else {
        console.error("❌ Booking not found for ID:", bookingId);
      }
    } else {
      console.log("ℹ️ Unhandled event type:", event.type);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("❌ Error handling webhook:", err);
    res.status(500).json({ error: "Error handling webhook" });
  }
};
