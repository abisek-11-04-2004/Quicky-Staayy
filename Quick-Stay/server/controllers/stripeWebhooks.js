import Stripe from "stripe";
import Booking from "../models/Booking.js";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// Api to handle stripe webhooks
export const stripeWebhooks = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const paymentIntentId = paymentIntent.id;

    // Get session by paymentIntentId
    const sessions = await stripeInstance.checkout.sessions.list({
      payment_intent: paymentIntentId,
    });

    if (sessions.data.length > 0) {
      const { bookingId } = sessions.data[0].metadata;

      // mark payment as paid
      await Booking.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paymentMethod: "Stripe",
      });
    }
  } else {
    console.log("Unhandled event type:", event.type);
  }

  response.json({ received: true });
};
