require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// Import Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/journal", require("./routes/journal"));

// Default Route
app.get("/api/journal", async (req, res) => {
    try {
        const [rows] = await pool.promise().query("SELECT * FROM journals ORDER BY created_at DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
