import React, { useState, useRef, useEffect } from 'react';
import './Camera.css';

const Camera = ({ onPhotoCaptured }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [photosTaken, setPhotosTaken] = useState(0);
  const [stream, setStream] = useState(null);

  // Memulai kamera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user" 
        }, 
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsActive(true);
        startCountdown();
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("Gagal mengakses kamera. Pastikan kamera Anda terhubung dan browser memiliki izin.");
    }
  };

  // Mematikan kamera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsActive(false);
    }
  };

  // Memulai hitungan mundur
  const startCountdown = () => {
    setCountdown(3);
  };

  // Mengambil foto
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL
      const photoData = canvas.toDataURL('image/jpeg');
      
      // Callback with the photo data
      onPhotoCaptured(photoData);
      
      // Update counter
      setPhotosTaken(prev => prev + 1);
    }
  };

  // Effect untuk countdown
  useEffect(() => {
    let timer;
    
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      capturePhoto();
      
      // Jika belum mencapai 3 foto, mulai countdown lagi
      if (photosTaken < 2) {
        setCountdown(3);
      } else {
        // Jika sudah 3 foto, stop kamera
        stopCamera();
      }
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [countdown, photosTaken]);

  // Cleanup pada unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="camera">
      <div className="camera-container">
        <video 
          ref={videoRef} 
          className="video-feed" 
          autoPlay 
          playsInline
        />
        
        <canvas 
          ref={canvasRef} 
          className="photo-canvas" 
          style={{ display: 'none' }}
        />
        
        {!isActive && photosTaken === 0 && (
          <div className="camera-overlay">
            <button className="btn btn-primary" onClick={startCamera}>
              Mulai Kamera
            </button>
          </div>
        )}
        
        {isActive && countdown !== null && (
          <div className="countdown-overlay">
            <div className="countdown">{countdown}</div>
          </div>
        )}
        
        <div className="photo-counter">
          Foto: {photosTaken}/3
        </div>
      </div>
    </div>
  );
};

export default Camera;