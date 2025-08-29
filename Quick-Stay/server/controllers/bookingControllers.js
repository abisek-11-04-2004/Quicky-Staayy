import transporter from "../configs/nodemailer.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ------------------ Helper: check availability ------------------
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });
    return bookings.length === 0;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

// ------------------ API: Check availability ------------------
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ------------------ API: Create booking ------------------
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;

    // check availability before booking
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not available" });
    }

    // calculate price
    const roomData = await Room.findById(room).populate("hotel");
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)
    );
    const totalPrice = roomData.pricePerNight * nights;

    // create booking in DB
    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    // send email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: req.user.email,
      subject: "Hotel Booking Details",
      html: `
        <h2>Your Booking Details</h2>
        <p>Dear ${req.user.username},</p>
        <p>Thank you for your booking! Here are your details:</p>
        <ul>
          <li><strong>Booking ID:</strong> ${booking._id}</li>
          <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
          <li><strong>Location:</strong> ${roomData.hotel.address}</li>
          <li><strong>Check-In:</strong> ${booking.checkInDate.toDateString()}</li>
          <li><strong>Check-Out:</strong> ${booking.checkOutDate.toDateString()}</li>
          <li><strong>Total Amount:</strong> ${
            process.env.CURRENCY || "$"
          } ${booking.totalPrice}</li>
        </ul>
        <p>We look forward to welcoming you!</p>
      `,
    };
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Booking Created Successfully", booking });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed To Create Booking" });
  }
};

// ------------------ API: Get user bookings ------------------
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch {
    res.json({ success: false, message: "Failed To fetch bookings" });
  }
};

// ------------------ API: Get hotel bookings (dashboard) ------------------
export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res.json({ success: false, message: "No Hotel Found" });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );

    res.json({
      success: true,
      dashboaredData: { totalBookings, totalRevenue, bookings },
    });
  } catch {
    res.json({ success: false, message: "failed to fetch bookings" });
  }
};

// ------------------ API: Stripe Payment ------------------
export const stripePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const roomData = await Room.findById(booking.room).populate("hotel");
    if (!roomData) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    const totalPrice = booking.totalPrice;
    if (!totalPrice || totalPrice <= 0) {
      return res.status(400).json({ success: false, message: "Invalid booking amount" });
    }

    const { origin } = req.headers;

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripeInstance.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${roomData.hotel.name} - ${roomData.roomType}`,
            },
            unit_amount: totalPrice * 100, // cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/loader/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      metadata: { bookingId },
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("❌ Stripe Payment Error:", error.message);
    res.status(500).json({ success: false, message: "Stripe payment failed" });
  }
};
