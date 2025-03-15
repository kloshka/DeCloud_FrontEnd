import React from 'react';

const Gallery = ({ files, onRemove }) => {
  return (
    <div className="gallery">
      {files.map((file, index) => (
        <div key={index} className="gallery__item">
          <div className="gallery__preview-container">
            <img 
              src={URL.createObjectURL(file)} 
              alt={`Uploaded ${index + 1}`}
              className="gallery__preview"
            />
          </div>
          <div className="gallery__filename">{file.name}</div>
          <div 
            className="gallery__cross-icon" 
            onClick={() => onRemove(index)}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;