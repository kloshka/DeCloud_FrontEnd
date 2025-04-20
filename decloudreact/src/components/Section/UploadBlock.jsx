import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadBlock = React.memo(() => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files || e.dataTransfer.files);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];

    setError('');

    // Проверка количества файлов
    if (files.length !== 2) {
      setError('Пожалуйста, загрузите ровно два изображения');
      return;
    }

    // Проверка типов файлов
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      setError('Поддерживаются только JPG, PNG и WEBP форматы');
      return;
    }

    // Если все проверки пройдены
    navigate('/processing', { state: { files } });
  }, [navigate]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  return (
    <label 
      className={`upload ${dragActive ? 'upload_dragover' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={(e) => {
        handleDrag(e);
        handleFileUpload(e);
      }}
    >
      <input 
        type="file" 
        multiple
        accept="image/jpeg, image/png, image/webp"
        className="upload__input" 
        onChange={handleFileUpload}
        style={{ display: 'none' }} 
      />
      <img 
        src={require('../../assets/images/upload.svg').default}
        className="upload__icon" 
        alt="Загрузите изображения"
        loading="lazy"
      />
      <div className="upload__button">ВЫБЕРИТЕ ФАЙЛЫ</div>
      <p className="upload__text">перетащите ровно два файла сюда</p>
      {error && <div className="upload__error-message">⚠️ {error}</div>}
    </label>
  );
});

export default UploadBlock;