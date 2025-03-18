import React, { useRef } from 'react';
import addIcon from '../assets/images/add.svg';

const Buttons = ({ onAddFiles, onProcessFiles }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    const filteredFiles = newFiles.filter(file => 
      validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024
    );
    
    onAddFiles(filteredFiles);
    e.target.value = null;
  };

  return (
    <div className="buttons">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <img 
        src={addIcon} 
        className="buttons__cross" 
        alt="Добавить"
        onClick={() => fileInputRef.current.click()}
      />
      <button 
        className="buttons__processing"
        onClick={onProcessFiles}
      >
        Начать обработку
      </button>
    </div>
  );
};

export default Buttons;
