import React from 'react';

const HistoryDate = ({ date, images }) => {
  return (
    <section className="history-date">
      <header className="history-date__header">
        <span className="history-date__text">{date}</span>
        <button className="history-date__download-btn" aria-label="Скачать все"></button>
      </header>
      <ul className="history-date__images">
        {images.map((image, index) => (
          <li key={index} className="history-date__item">
            <div className="history-date__media">
              <img className="history-date__frame" src={image.src} alt="Обработанное изображение" />
              <p className="history-date__caption">{image.caption}</p>
            </div>
            <div className="history-date__actions">
              <button className="history-date__delete" aria-label="Удалить"></button>
              <button className="history-date__download" aria-label="Скачать"></button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HistoryDate;