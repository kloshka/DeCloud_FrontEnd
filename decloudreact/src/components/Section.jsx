const Section = () => {
  return (
    <section className="section">
      <h2 className="section__title">Удалить облака с изображения</h2>
      <UploadBlock />
      <InfoBlock />
    </section>
  );
};

// Компонент для блока загрузки файлов
const UploadBlock = () => {
  const handleFileUpload = (e) => {
    // Логика обработки файла
    const file = e.target.files[0];
    console.log('Selected file:', file);
  };

  return (
    <label className="upload">
      <input 
        type="file" 
        className="upload__input" 
        onChange={handleFileUpload}
        style={{ display: 'none' }} 
      />
      <img 
        src={require('../assets/images/upload.svg').default}
        className="upload__icon" 
        alt="Загрузите изображения"
      />
      <div className="upload__button">ВЫБЕРИТЕ ФАЙЛЫ</div>
      <p className="upload__text">или перетащите файл сюда</p>
    </label>
  );
};

// Компонент для информационного блока
const InfoBlock = () => {
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
};

export default Section;