import React from 'react';
import downloadIcon from '../assets/images/download.svg';
import ContinueArea from './ContinueArea';
import { useLocation } from 'react-router-dom';

const DownloadSection = () => {
  const location = useLocation();
  const files = location.state?.files || [];

  const handleDownload = () => {
    files.forEach(file => {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name || 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <section className="section">
      <h2 className="section__title">Облака были удалены с изображений</h2>
      
      <div 
        className="download"
        onClick={handleDownload}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
      >
        <img 
          src={downloadIcon} 
          className="download__icon" 
          alt="Скачать изображение" 
        />
        <span className="download__text">Скачать изображение JPG</span>
      </div>

      <ContinueArea />
    </section>
  );
};

export default DownloadSection;
