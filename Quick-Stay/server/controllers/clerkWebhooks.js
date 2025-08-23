import User from "../models/User.js";
import { Webhook } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

const clerkWebhooks = async (req, res) => {
  try {
    if (!webhookSecret) {
      return res.status(500).json({ message: "Webhook secret not configured" });
    }

    const wh = new Webhook(webhookSecret);

    const payload = JSON.stringify(req.body);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const evt = wh.verify(payload, headers);
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    console.log("✅ Clerk Webhook Event:", evt.type);

    switch (evt.type) {
      case "user.created": {
        const userData = {
          _id: id,
          email: email_addresses?.[0]?.email_address || "",
          username: `${first_name || ""} ${last_name || ""}`.trim(),
          image: image_url,
          role: "user", // 🔧 explicitly set to match enum
          recentSearchedCities: [],
        };
        await User.create(userData);
        break;
      }
      case "user.updated": {
        const userData = {
          _id: id,
          email: email_addresses?.[0]?.email_address || "",
          username: `${first_name || ""} ${last_name || ""}`.trim(),
          image: image_url,
          role: "user", // 🔧 explicitly set to match enum
          recentSearchedCities: [],
        };
        await User.findByIdAndUpdate(id, userData, { new: true, upsert: true });
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(id);
        break;
      }
      default:
        console.log("Unhandled event type:", evt.type);
        break;
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Clerk webhook error:", err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export default clerkWebhooks;
