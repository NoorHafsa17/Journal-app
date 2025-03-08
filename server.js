const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const JournalEntry = require('./models/JournalEntry'); // Import Journal Model

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Allows JSON data in requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Failed:', err));

// 📌 Route to create a new journal entry
app.post('/api/journal', async (req, res) => {
    try {
        const { title, content, mood } = req.body;

        // Create a new entry
        const newEntry = new JournalEntry({ title, content, mood });

        // Save to MongoDB
        await newEntry.save();

        res.status(201).json({ message: 'Journal entry saved!', entry: newEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error saving entry', error });
    }
});

// 📌 Sample Route (Keep this for testing)
app.get('/', (req, res) => {
    res.send('Daily Journal App Backend is Running with MongoDB!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
