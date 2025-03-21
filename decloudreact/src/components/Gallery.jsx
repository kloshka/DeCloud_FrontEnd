import React, { useEffect, useState, memo, useCallback } from 'react';
import GalleryItem from './GalleryItem';
import { compressImage } from '../utils/imageUtils.jsx';

const ITEMS_PER_PAGE = 12;

const Gallery = memo(({ files, onRemove }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [compressedUrls, setCompressedUrls] = useState([]);
  const totalPages = Math.ceil(files.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const compressAllImages = async () => {
      const urls = await Promise.all(
        files.map(async (file) => {
          try {
            return await compressImage(file);
          } catch (error) {
            console.error('Error compressing image:', error);
            return URL.createObjectURL(file);
          }
        })
      );
      setCompressedUrls(urls);
    };

    compressAllImages();
  }, [files]);

  const handleRemove = useCallback((index) => {
    onRemove(index);
    setCompressedUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      newUrls.splice(index, 1);
      return newUrls;
    });

    if (files.length % ITEMS_PER_PAGE === 1 && currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [onRemove, files.length, currentPage]);

  const currentFiles = files.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="gallery-wrapper">
      <div className="gallery-container">
        <div className="gallery">
          {currentFiles.map((file, index) => {
            const globalIndex = currentPage * ITEMS_PER_PAGE + index;
            return (
              <GalleryItem 
                key={`${file.name}_${globalIndex}`}
                file={file} 
                compressedUrl={compressedUrls[globalIndex]}
                onRemove={() => handleRemove(globalIndex)}
              />
            );
          })}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="gallery-pagination">
          <button
            className="gallery-pagination__button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          
          <span className="gallery-pagination__info">
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            className="gallery-pagination__button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
});

export default Gallery;
