import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { combineImages } from '../../services/api';
import './Result.css';

const Result = () => {
  const [resultImage, setResultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const templateId = queryParams.get('template');
  const layout = queryParams.get('layout');
  const photosList = queryParams.get('photos');
  
  // Get photos from query params
  const photos = photosList ? photosList.split(',') : [];

  // Create combined image
  useEffect(() => {
    const processImages = async () => {
      if (!templateId || !layout || photos.length !== 3) {
        setError('Data tidak valid. Silakan mulai dari awal.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await combineImages(photos, templateId, layout);
        
        if (response.success) {
          setResultImage(response.outputImage);
        } else {
          setError(response.message || 'Gagal memproses foto');
        }
      } catch (error) {
        console.error('Error combining images:', error);
        setError('Terjadi kesalahan saat memproses foto');
      } finally {
        setIsLoading(false);
      }
    };

    processImages();
  }, [templateId, layout, photos]);

  // Download the result image
  const handleDownload = () => {
    if (!resultImage) return;
    
    const link = document.createElement('a');
    link.href = `${process.env.REACT_APP_API_URL}${resultImage}`;
    link.download = `photobox_${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Go back to home
  const handleStartOver = () => {
    navigate('/');
  };

  return (
    <div className="result-page">
      <h2 className="section-title">Hasil PhotoBox</h2>
      
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Memproses foto Anda...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error-icon">!</div>
          <p className="error-message">{error}</p>
          <button className="btn btn-primary" onClick={handleStartOver}>Mulai Ulang</button>
        </div>
      ) : resultImage ? (
        <div className="result-container">
          <div className="result-image-container">
            <img 
              src={`${process.env.REACT_APP_API_URL}${resultImage}`} 
              alt="PhotoBox Result" 
              className="result-image"
            />
          </div>
          
          <div className="result-actions">
            <button className="btn btn-primary" onClick={handleDownload}>
              Download Hasil
            </button>
            <button className="btn btn-secondary" onClick={handleStartOver}>
              Mulai Baru
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Result;