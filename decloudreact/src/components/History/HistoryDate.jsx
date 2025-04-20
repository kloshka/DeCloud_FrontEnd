import React, { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { compressImage } from '../../utils/ImageUtils.jsx';
import './History.css';

const HistoryDate = ({ date, images, onDeleteImage }) => {
  const [compressedUrls, setCompressedUrls] = useState([]);
  const [isZipping, setIsZipping] = useState(false);

  useEffect(() => {
    const compressAllImages = async () => {
      const urls = await Promise.all(
        images.map(async (image) => {
          try {
            if (image.file) {
              return await compressImage(image.file);
            }
            return image.src;
          } catch (error) {
            console.error('Ошибка при сжатии:', error);
            return image.src;
          }
        })
      );
      setCompressedUrls(urls);
    };

    compressAllImages();
  }, [images]);

  const handleDownload = (url, filename = 'image.jpg') => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAllAsZip = async () => {
    if (isZipping || images.length === 0) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder(date.replace(/[^a-zA-Z0-9]/g, '_')) || zip;

      for (let i = 0; i < images.length; i++) {
        const url = compressedUrls[i] || images[i].src;
        const filename = images[i].caption || `image_${i + 1}.jpg`;

        const response = await fetch(url);
        const blob = await response.blob();

        folder.file(filename, blob);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${date.replace(/[^a-zA-Z0-9]/g, '_')}.zip`);
    } catch (error) {
      console.error('Ошибка при создании архива:', error);
    } finally {
      setIsZipping(false);
    }
  };

  const handleDelete = (indexToDelete) => {
    if (onDeleteImage) {
      onDeleteImage(indexToDelete);
    }
  };

  return (
    <section className="history-date">
      <header className="history-date__header">
        <span className="history-date__text">{date}</span>
        <button
          className="history-date__download-btn"
          aria-label="Скачать все"
          onClick={handleDownloadAllAsZip}
          disabled={isZipping}
        >
        </button>
      </header>

      <ul className="history-date__images">
        {images.map((image, index) => {
          const compressedUrl = compressedUrls[index] || image.src;
          const extension = compressedUrl.split('.').pop()?.split('?')[0] || 'jpg';
          const filename = image.caption || `image_${index + 1}.${extension}`;

          return (
            <li key={index} className="history-date__item">
              <div className="history-date__media">
                <img
                  className="history-date__frame"
                  src={compressedUrl}
                  alt={image.caption || 'Изображение'}
                  loading="lazy"
                />
                {image.caption && (
                  <p className="history-date__caption">{image.caption}</p>
                )}
              </div>
              <div className="history-date__actions">
                <button
                  className="history-date__delete"
                  aria-label="Удалить"
                  onClick={() => handleDelete(index)}
                ></button>
                <button
                  className="history-date__download"
                  aria-label="Скачать"
                  onClick={() => handleDownload(compressedUrl, filename)}
                ></button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default HistoryDate;
