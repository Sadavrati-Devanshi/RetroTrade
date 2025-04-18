import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create an order with Razorpay
export const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt, notes } = req.body;
    
    if (!amount) {
      return res.status(400).json({ 
        success: false, 
        error: "Amount is required" 
      });
    }

    // Validate required fields from notes
    if (!notes.productId) {
      return res.status(400).json({
        success: false,
        error: "Product ID is required in notes"
      });
    }

    if (!notes.sellerId) {
      return res.status(400).json({
        success: false,
        error: "Seller ID is required in notes"
      });
    }

    // Create order with Razorpay
    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
      payment_capture: 1 // Auto capture payment
    };

    const order = await razorpay.orders.create(options);
    
    // Save order details to your database with required fields
    const newOrder = new Order({
      user: req.user?._id, // Buyer
      buyer: req.user?._id, // Add this required field
      seller: notes.sellerId, // Add this required field
      product: notes.productId, // Add this required field
      razorpayOrderId: order.id,
      amount: amount,
      currency,
      receipt: options.receipt,
      notes: options.notes,
      status: "created"
    });
    
    await newOrder.save();

    res.status(200).json({
      success: true,
      data: {
        order_id: order.id,
        currency: order.currency,
        amount: order.amount / 100, // Convert back to main unit
        key_id: process.env.RAZORPAY_KEY_ID
      }
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Payment creation failed: " + error.message 
    });
  }
};

// Verify payment signature
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId, sellerId } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        error: "All payment details are required" 
      });
    }
    
    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        error: "Payment verification failed: Invalid signature" 
      });
    }
    
    // Update order status in database
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { 
        status: "paid", 
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        productId // Make sure productId is passed
      },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        error: "Order not found" 
      });
    }
    
    // Fetch payment details from Razorpay (optional but useful)
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: {
        order,
        payment: {
          id: payment.id,
          amount: payment.amount / 100,
          method: payment.method,
          status: payment.status
        }
      }
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Payment verification failed: " + error.message 
    });
  }
};

// Get payment details by ID
export const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    if (!paymentId) {
      return res.status(400).json({
        success: false,
        error: "Payment ID is required"
      });
    }
    
    const payment = await razorpay.payments.fetch(paymentId);
    
    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error("Get payment details error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve payment details: " + error.message
    });
  }
};


// Get all payments for a user
export const getUserPayments = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        error: "User not authenticated"
      });
    }
    
    // Find orders where the current user is either the buyer or seller
    // Remove the populate calls that are causing issues
    const orders = await Order.find({
      $or: [
        { user: req.user._id },
        { buyer: req.user._id },
        { seller: req.user._id }
      ]
    }).sort({ createdAt: -1 }); // Most recent first
    
    // Group the orders by status for easier frontend handling
    const createdOrders = orders.filter(order => order.status === 'created');
    const paidOrders = orders.filter(order => order.status === 'paid');
    
    res.status(200).json({
      success: true,
      data: orders, // Full list for general use
      createdOrders, // Only orders with 'created' status
      paidOrders, // Only orders with 'paid' status
      counts: {
        total: orders.length,
        created: createdOrders.length,
        paid: paidOrders.length
      }
    });
  } catch (error) {
    console.error("Get user payments error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve user payments: " + error.message
    });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    // Check if user is admin - adjust this check based on your authentication system
    console.log("User in request:", req.user);
    console.log("User admin status:", req.user?.isAdmin);
    // if (!req.user?.isAdmin) {
    //   return res.status(403).json({
    //     success: false,
    //     error: "Unauthorized: Admin access required"
    //   });
    // }
    
    console.log("Fetching all orders from database...");
    
    // Find all orders - no filtering!
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean(); // Using lean() for better performance
    
    console.log(`Found ${orders.length} orders in database`);
    
    res.status(200).json({
      success: true,
      data: orders,
      message: `Successfully retrieved ${orders.length} orders`
    });
  } catch (error) {
    console.error("Get all payments error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve all payments: " + error.message
    });
  }
};