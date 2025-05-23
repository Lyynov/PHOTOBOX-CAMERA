import React from 'react';
import './PhotoGrid.css';

const PhotoGrid = ({ photos }) => {
  return (
    <div className="photo-grid">
      {photos.map((photo, index) => (
        <div key={index} className="photo-item">
          {photo ? (
            <img src={photo} alt={`Photo ${index + 1}`} />
          ) : (
            <div className="empty-photo">
              <span>{index + 1}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;