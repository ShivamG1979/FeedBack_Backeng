// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// API Routes
app.post('/api/submit-feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Create new feedback
    const newFeedback = new Feedback({
      name,
      email,
      message,
      timestamp: new Date()
    });
    
    // Save to database
    await newFeedback.save();
    
    res.status(201).json({ 
      message: 'Feedback submitted successfully',
      feedback: newFeedback
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ timestamp: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// NEW: Update feedback route
app.put('/api/feedbacks/:id', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Find and update feedback
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { name, email, message },
      { new: true }
    );
    
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.json({
      message: 'Feedback updated successfully',
      feedback: updatedFeedback
    });
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// NEW: Delete feedback route
app.delete('/api/feedbacks/:id', async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.json({
      message: 'Feedback deleted successfully',
      feedback: deletedFeedback
    });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});