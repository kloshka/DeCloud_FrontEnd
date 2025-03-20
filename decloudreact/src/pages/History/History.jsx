import React from 'react';
import Header from '../../components/Header';
import HistoryDate from '../../components/HistoryDate';
import sputnikImage from '../../assets/images/sputnik.jpg';

import './History.css';

const HistoryPage = () => {
    const historyData = [
        {
          date: 'Вчера, 26 февраля',
          images: [
            { src: sputnikImage, caption: 'sputnik1232.jpg' },
            { src: sputnikImage, caption: 'sputnik1233.jpg' },
            { src: sputnikImage, caption: 'sputnik1234.jpg' },
          ],
        },
        {
          date: '23 февраля',
          images: [
            { src: sputnikImage, caption: 'sputnik1234.jpg' },
          ],
        },
      ];

  return (
    <div className="history_body">
      <Header />
      <main className="history">
        <h2 className="history__title">История обработки</h2>
        {historyData.map((item, index) => (
          <HistoryDate key={index} date={item.date} images={item.images} />
        ))}
      </main>
    </div>
  );
};

export default HistoryPage;