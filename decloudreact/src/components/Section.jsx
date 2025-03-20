import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Section = () => {
  return (
    <section className="section">
      <h2 className="section__title">Удалить облака с изображения</h2>
      <UploadBlock />
      <InfoBlock />
    </section>
  );
};

const UploadBlock = React.memo(() => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files || e.dataTransfer.files);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];

    setError('');
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      setError('Поддерживаются только JPG, PNG и WEBP форматы');
      return;
    }

    if (files.length > 0) {
      navigate('/processing', { state: { files } }); // Убрали .slice(0, 9)
    }
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
        src={require('../assets/images/upload.svg').default}
        className="upload__icon" 
        alt="Загрузите изображения"
        loading="lazy"
      />
      <div className="upload__button">ВЫБЕРИТЕ ФАЙЛЫ</div>
      <p className="upload__text">или перетащите файл сюда</p>
      {error && <div className="upload__error-message">⚠️ {error}</div>}
    </label>
  );
});

const InfoBlock = React.memo(() => {
  return (
    <div className="info">
      <div className="info__description">
        Спутниковые снимки часто загрязнены облаками, что затрудняет их анализ. 
        Мы предлагаем идеальный инструмент для тех, кто хочет удалить облака со спутниковых изображений. 
        Он прост, быстр и бесплатен, не требует регистрации и не накладывает водяные знаки на изображения.
      </div>
      
      <ul className="info__features">
        <li className="info__feature">Быстрая обработка изображений</li>
        <li className="info__feature">Работает через браузер</li>
      </ul>

      <img 
        src={require('../assets/images/icons.svg').default} 
        className="info__image" 
        alt="Преимущества"
        loading="lazy"
      />

      <div className="info__steps-container">
        <p className="info__steps-title">Как удалить облака с изображений</p>
        <ol className="info__steps">
          <li className="info__steps-item">Импортируйте или перетащите изображения в обработчик</li>
          <li className="info__steps-item">Нажмите начать обработку</li>
          <li className="info__steps-item">Загрузите изображения</li>
        </ol>
      </div>
    </div>
  );
});

export default Section;