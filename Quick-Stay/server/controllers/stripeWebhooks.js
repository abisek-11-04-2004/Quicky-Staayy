import stripe from "stripe";
import Booking from "../models/Booking.js";

// API to handle Stripe webhooks
export const stripeWebhooks = async (request, response) => {
  // stripe gateway initialization
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_SECRET_KEY
    );
    console.log("Stripe webhook event received:", event.type);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle the event

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const paymentIntentId = paymentIntent.id;
    console.log("PaymentIntent succeeded:", paymentIntentId);

    // Getting the session metadata
    let session;
    try {
      session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
      console.log("Stripe session list:", session.data);
    } catch (err) {
      console.error("Error fetching session:", err);
      return response.status(500).json({ error: "Error fetching session" });
    }

    if (!session.data || !session.data[0] || !session.data[0].metadata) {
      console.error("No session metadata found for paymentIntent:", paymentIntentId);
      return response.status(400).json({ error: "No session metadata found" });
    }

    const { bookingId } = session.data[0].metadata;
    console.log("Booking ID from metadata:", bookingId);

    // Mark Payment as paid
    try {
      const updateResult = await Booking.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paymentMethod: "Stripe",
      }, { new: true });
      console.log("Booking update result:", updateResult);
    } catch (err) {
      console.error("Error updating booking:", err);
      return response.status(500).json({ error: "Error updating booking" });
    }
  } else {
    console.log("Unhandled event type:", event.type);
  }
  response.json({ received: true });
};