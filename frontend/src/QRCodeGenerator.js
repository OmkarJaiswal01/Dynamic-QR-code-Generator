import React, { useState } from 'react';
import axios from 'axios';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleGenerateQR = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-qr', { text });
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleDownloadQR = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Dynamic QR Code Generator</h2>
      <input
        type="text"
        placeholder="Enter text to generate QR code"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '8px', width: '300px' }}
      />
      <button onClick={handleGenerateQR} style={{ marginLeft: '10px', padding: '8px' }}>
        Generate QR Code
      </button>

      {qrCode && (
        <div style={{ marginTop: '20px' }}>
          <img src={qrCode} alt="Generated QR Code" />
          <button onClick={handleDownloadQR} style={{ display: 'block', margin: '20px auto', padding: '8px' }}>
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
