import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import HistoryDate from '../../components/History/HistoryDate';
import sputnikImage from '../../assets/images/sputnik.jpg';
import anotherImage from '../../assets/images/roblox.png';

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([
    {
      date: 'Вчера, 26 февраля',
      images: [
        { src: sputnikImage, caption: 'sputnik1232.jpg' },
        { src: sputnikImage, caption: 'sputnik1233.jpg' },
        { src: sputnikImage, caption: 'sputnik1234.jpg' },
        { src: sputnikImage, caption: 'sputnik1235.jpg' },
        { src: sputnikImage, caption: 'sputnik1236.jpg' },
        { src: sputnikImage, caption: 'sputnik1237.jpg' },
        { src: sputnikImage, caption: 'sputnik1238.jpg' },
        { src: sputnikImage, caption: 'sputnik1239.jpg' },
        { src: anotherImage, caption: 'sputnik1240.jpg' },
        { src: sputnikImage, caption: 'sputnik1232.jpg' },
        { src: sputnikImage, caption: 'sputnik1233.jpg' },
        { src: sputnikImage, caption: 'sputnik1234.jpg' },
        { src: sputnikImage, caption: 'sputnik1235.jpg' },
        { src: sputnikImage, caption: 'sputnik1236.jpg' },
        { src: sputnikImage, caption: 'sputnik1237.jpg' },
        { src: sputnikImage, caption: 'sputnik1238.jpg' },
        { src: sputnikImage, caption: 'sputnik1239.jpg' },
        { src: anotherImage, caption: 'sputnik1240.jpg' },
      ],
    },
    {
      date: '23 февраля',
      images: [
        { src: sputnikImage, caption: 'sputnik1241.jpg' },
      ],
    },
  ]);

  const handleDeleteImage = (dateIndex, imageIndex) => {
    setHistoryData((prevData) => {
      const newData = [...prevData];
      const newImages = newData[dateIndex].images.filter((_, i) => i !== imageIndex);
      
      // Если изображений не осталось, удаляем всю дату
      if (newImages.length === 0) {
        return newData.filter((_, i) => i !== dateIndex);
      }
      
      newData[dateIndex] = { ...newData[dateIndex], images: newImages };
      return newData;
    });
  };

  return (
    <div className="history_body">
      <Header />
      <main className="history">
        <h2 className="history__title">История обработки</h2>
        {historyData.length > 0 ? (
          historyData.map((item, dateIndex) => (
            <HistoryDate
              key={`${dateIndex}_${item.date}`}
              date={item.date}
              images={item.images}
              onDeleteImage={(imageIndex) => handleDeleteImage(dateIndex, imageIndex)}
            />
          ))
        ) : (
          <p className="history__empty">Нет данных для отображения</p>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;