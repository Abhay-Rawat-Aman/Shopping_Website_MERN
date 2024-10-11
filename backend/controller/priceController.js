const { Product } = require('../models/product.js');
const Order = require('../models/Order');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_zR3Hw3haQMWYC9",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "W50i31GU4hsAObmu6DaTpw1f"
});


exports.createOrder = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Product ID and quantity are required"
            });
        }

        const product = await Product.findById(productId);
        console.log(product);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const totalAmount = product.newPrice * quantity;

        if (isNaN(totalAmount) || totalAmount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid total amount"
            });
        }

        console.log('Creating Razorpay order with amount:', totalAmount);

        const options = {
            amount: Math.round(totalAmount * 100),
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`
        };

        razorpayInstance.orders.create(options, async (err, order) => {
            if (err) {
                console.error("Razorpay order creation error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Razorpay order creation failed",
                    error: err.message,
                    details: err
                });
            }

            console.log('Razorpay order created successfully:', order);

            const newOrder = new Order({
                razorpayOrderId: order.id,
                product: productId,
                quantity: quantity,
                amount: totalAmount,
                status: 'created'
            });

            await newOrder.save();

            return res.status(200).json({
                success: true,
                order
            });
        });
    } catch (error) {
        console.error("Error in order creation:", error);
        res.status(500).json({
            success: false,
            message: "Order creation failed",
            error: error.message || "Unknown error"
        });
    }
};


// Verify payment using Razorpay signature
exports.verifyPayment = async (req, res) => {
    try {
        console.log('Received payment verification data:', req.body);

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Validate request body
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            console.log('Missing required fields:', {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });
            return res.status(400).json({
                success: false,
                message: "Required payment details are missing"
            });
        }

        const secret = process.env.RAZORPAY_KEY_SECRET;

        // Generate signature
        const generated_signature = crypto
            .createHmac("sha256", secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        console.log('Generated signature:', generated_signature);
        console.log('Received signature:', razorpay_signature);

        if (generated_signature === razorpay_signature) {
            // Update the order status to completed
            await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: 'completed', paymentId: razorpay_payment_id }
            );

            return res.status(200).json({
                success: true,
                message: "Payment verified and order updated"
            });
        } else {
            // Update order status to failed if signature doesn't match
            await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: 'failed' }
            );

            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }
    } catch (error) {
        console.error("Error in payment verification:", error);
        res.status(500).json({
            success: false,
            message: "Payment verification failed",
            error: error.message || "Unknown error"
        });
    }
};
