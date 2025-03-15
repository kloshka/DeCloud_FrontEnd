// components/DownloadSection.jsx
import React from 'react';
import downloadIcon from '../assets/images/download.svg';
import ContinueArea from './ContinueArea';

const DownloadSection = () => {
  const handleDownload = () => {
    // Логика для скачивания
    console.log('Download initiated');
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