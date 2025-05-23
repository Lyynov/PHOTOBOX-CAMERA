import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Camera from '../../components/Camera/Camera';
import PhotoGrid from '../../components/PhotoGrid/PhotoGrid';
import { savePhoto } from '../../services/api';
import './PhotoCapture.css';

const PhotoCapture = () => {
  const [photos, setPhotos] = useState([null, null, null]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const templateId = queryParams.get('template');
  const layout = queryParams.get('layout');

  // Start the capturing process
  const startCapturing = () => {
    // Reset state
    setPhotos([null, null, null]);
    setPhotoFiles([]);
    setIsCapturing(true);
  };

  // Handle photo capture
  const handlePhotoCaptured = async (photoData) => {
    // Update photos array
    const currentIndex = photoFiles.length;
    
    // Save to API
    try {
      const response = await savePhoto(photoData);
      
      if (response.success) {
        // Add the new photo to the photos array
        const newPhotos = [...photos];
        newPhotos[currentIndex] = photoData;
        setPhotos(newPhotos);
        
        // Add the filename to the photoFiles array
        setPhotoFiles([...photoFiles, response.filename]);
        
        // If we've taken 3 photos, we're done
        if (photoFiles.length === 2) {
          setIsCapturing(false);
          // Small delay to ensure the photo is visible
          setTimeout(() => {
            proceedToResults();
          }, 1000);
        }
      } else {
        console.error('Failed to save photo:', response.message);
        alert('Gagal menyimpan foto. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error saving photo:', error);
      alert('Terjadi kesalahan saat menyimpan foto. Silakan coba lagi.');
    }
  };

  // Proceed to results page
  const proceedToResults = () => {
    setIsProcessing(true);
    
    // Navigate to results page with the necessary data
    navigate(`/result?template=${templateId}&layout=${layout}&photos=${photoFiles.join(',')}`);
  };

  // If we don't have template or layout, go back to home
  useEffect(() => {
    if (!templateId || !layout) {
      navigate('/');
    }
  }, [templateId, layout, navigate]);

  return (
    <div className="photo-capture-page">
      <h2 className="section-title">Ambil Foto</h2>
      
      {isCapturing ? (
        <Camera onPhotoCaptured={handlePhotoCaptured} />
      ) : (
        <div className="start-capture-container">
          <div className="camera-placeholder">
            <div className="camera-icon"></div>
            <p>Siap untuk mengambil foto?</p>
            <button className="btn btn-primary" onClick={startCapturing}>
              Mulai Pengambilan Foto
            </button>
          </div>
        </div>
      )}
      
      <div className="photo-grid-container">
        <h3>Foto Anda:</h3>
        <PhotoGrid photos={photos} />
      </div>
      
      {isProcessing && (
        <div className="processing-overlay">
          <div className="processing-spinner"></div>
          <p>Memproses foto...</p>
        </div>
      )}
    </div>
  );
};

export default PhotoCapture;