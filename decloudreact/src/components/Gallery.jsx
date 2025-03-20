import React, { useEffect, useState, memo, useCallback } from 'react';

const ITEMS_PER_PAGE = 12;
const MAX_WIDTH = 800;
const MAX_HEIGHT = 600;
const QUALITY = 0.7;

// Функция для сжатия изображения (без изменений)
const compressImage = (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const url = URL.createObjectURL(blob);
            resolve(url);
          },
          'image/jpeg',
          QUALITY
        );
      };
    };

    reader.readAsDataURL(file);
  });
};

const GalleryItem = memo(({ file, compressedUrl, onRemove }) => {
  return (
    <div className="gallery__item">
      <div className="gallery__preview-container">
        {compressedUrl ? (
          <img 
            src={compressedUrl} 
            alt={`Uploaded`}
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

const Gallery = memo(({ files, onRemove }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [compressedUrls, setCompressedUrls] = useState([]);
  const totalPages = Math.ceil(files.length / ITEMS_PER_PAGE);

  // Сжимаем изображения при изменении files
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

  // Обработчик удаления изображения
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

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }, []);

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
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          
          <span className="gallery-pagination__info">
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            className="gallery-pagination__button"
            onClick={handleNext}
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