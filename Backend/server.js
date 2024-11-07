const express = require('express');
const mongoose = require('mongoose');
const QRCode = require('qrcode');
const cors = require('cors');
const QRCodeModel = require('./QRCodeModel');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/qrCodeDB'; // Replace with your MongoDB URI

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Route to generate and save QR code
app.post('/generate-qr', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    // Generate QR code as a data URL
    const qrCodeDataURL = await QRCode.toDataURL(text);

    // Save the QR code data to MongoDB
    const qrCode = new QRCodeModel({ text });
    await qrCode.save();

    // Respond with the QR code data URL
    res.json({ qrCode: qrCodeDataURL });
  } catch (error) {
    res.status(500).json({ error: 'Error generating QR code' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
