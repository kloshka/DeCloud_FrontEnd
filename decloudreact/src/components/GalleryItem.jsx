import React, { memo } from 'react';

const GalleryItem = memo(({ file, compressedUrl, onRemove }) => {
  return (
    <div className="gallery__item">
      <div className="gallery__preview-container">
        {compressedUrl ? (
          <img 
            src={compressedUrl} 
            alt={file.name}
            className="gallery__preview"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="gallery__placeholder" />
        )}
      </div>
      <div className="gallery__filename">{file.name}</div>
      <div 
        className="gallery__cross-icon" 
        onClick={onRemove}
      ></div>
    </div>
  );
});

export default GalleryItem;
