// const express = require('express');
// const Razorpay = require('razorpay');
// const cors = require('cors'); // Import cors
// const app = express();

// // Enable CORS for all origins (you can customize this if needed)
// app.use(cors());

// // Middleware to parse JSON body
// app.use(express.json());

// // POST route to create a Razorpay order
// app.post('/orders', async (req, res) => {
//     const razorpay = new Razorpay({
//         key_id: "YOUR_KEY_ID",
//         key_secret: "YOUR_KEY_SECRET"
//     });

//     const options = {
//         amount: req.body.amount * 100,  // Ensure the amount is in the correct unit
//         currency: req.body.currency,
//         receipt: "receipt#1",
//         payment_capture: 1
//     };

//     try {
//         const response = await razorpay.orders.create(options);
//         res.json({
//             order_id: response.id,
//             currency: response.currency,
//             amount: response.amount
//         });
//     } catch (error) {
//         console.error("Error creating Razorpay order:", error);
//         res.status(500).json({ 
//             message: "Server Error",
//             error: error.message,
//             details: error.response ? error.response.data : null
//         });
//     }
// });


// // GET route to fetch payment details
// app.get('/payment/:paymentId', async (req, res) => {
//     const { paymentId } = req.params;

//     const razorpay = new Razorpay({
//         key_id: "YOUR_KEY_ID",  // Replace with actual key ID
//         key_secret: "YOUR_KEY_SECRET"  // Replace with actual key secret
//     });

//     try {
//         const payment = await razorpay.payments.fetch(paymentId);
//         if (!payment) {
//             return res.status(400).json({ message: "Payment ID not found" });
//         }

//         res.status(200).json({
//             status: payment.status,
//             method: payment.method,
//             amount: payment.amount,
//             currency: payment.currency
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// // Start the server
// const PORT = process.env.PORT || 5100;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
// Socket.io connection handling
// io.on("connection", (socket) => {  // Corrected event name to lowercase "connection"
//     console.log(`User Connected: ${socket.id}`);

//     // Listen for messages
//     socket.on("send-message", (message) => {
//         io.emit("receive-message", message);  // Corrected event name to lowercase
//     });

//     // Handle disconnection
//     socket.on("disconnect", () => {  // Corrected to 'disconnect'
//         console.log(`User Disconnected: ${socket.id}`);
//     });
// });

// // Start the server
// server.listen(4000, () => {
//     console.log("Server is running on port 4000");
// });
// const { Server } = require('socket.io');
// const http = require('http');

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",  // Adjust the origin as needed
//         methods: ["GET", "POST"],
//     }
// });
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend's origin
//   methods: 'GET,POST,PUT,DELETE',
//   credentials: true, // Include cookies in requests if needed
// }));