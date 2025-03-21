// components/ContinueArea.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import backIcon from '../../assets/images/back-to-main__icon.svg';
import "./DownloadSection.css"

const ContinueArea = () => {
  return (
    <div className="continue-area">
      <p className="continue-area__text">Продолжить...</p>
      <Link to="/processing" className="back-to-main">
        <img 
          src={backIcon} 
          className="back-to-main__icon" 
          alt="Иконка обработки" 
        />
        <span className="back-to-main__button">
          Обработка изображений ❯
        </span>
      </Link>
    </div>
  );
};

export default ContinueArea;