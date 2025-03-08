const mongoose = require('mongoose');

// Define the journal entry schema
const JournalEntrySchema = new mongoose.Schema({
    title: { type: String, required: true },  // Entry title
    content: { type: String, required: true },  // Entry content
    mood: { type: String, enum: ['Happy', 'Sad', 'Neutral', 'Excited', 'Angry'], required: true },  // Mood selection
    createdAt: { type: Date, default: Date.now }  // Timestamp
});

// Create the model from the schema
const JournalEntry = mongoose.model('JournalEntry', JournalEntrySchema);

module.exports = JournalEntry;
