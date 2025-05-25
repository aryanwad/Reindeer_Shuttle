import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const CheckIn = () => {
  const [scanning, setScanning] = useState(false);
  const [qrResult, setQrResult] = useState('');
  const [error, setError] = useState('');
  const scannerRef = useRef(null); // To hold the Html5Qrcode scanner instance
  const cameraIdRef = useRef(null); // To hold the selected camera ID

  const startScanner = async () => {
    setError('');
    setQrResult('');
    setScanning(true);

    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length) {
        const cameraId = devices[0].id;
        cameraIdRef.current = cameraId;

        scannerRef.current = new Html5Qrcode('qr-reader');
        scannerRef.current.start(
          cameraId,
          {
            fps: 10,
            qrbox: 250
          },
          (decodedText) => {
            setQrResult(decodedText);
            setScanning(false);
            scannerRef.current.stop().then(() => {
              console.log('Scanner stopped');
            });
          },
          (err) => {
            console.warn('Scanning error', err);
          }
        );
      } else {
        setError('No camera devices found');
        setScanning(false);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to start camera');
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop();
      await scannerRef.current.clear();
      scannerRef.current = null;
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanner(); // Cleanup on unmount
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Scan QR to Check In</h2>

      {!scanning && (
        <button onClick={startScanner}>Start Scan</button>
      )}

      {scanning && (
        <div>
          <div id="qr-reader" style={{ width: '300px', margin: 'auto' }}></div>
          <button onClick={stopScanner} style={{ marginTop: '10px' }}>
            Stop Scan
          </button>
        </div>
      )}

      {qrResult && (
        <p><strong>✅ QR Code:</strong> {qrResult}</p>
      )}

      {error && (
        <p style={{ color: 'red' }}>⚠️ {error}</p>
      )}
    </div>
  );
};

export default CheckIn;
