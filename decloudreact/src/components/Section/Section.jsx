import React from 'react';
import UploadBlock from './UploadBlock';
import InfoBlock from './InfoBlock';
import './Section.css';

const Section = () => {
  return (
    <section className="section">
      <h2 className="section__title">Удалить облака с изображения</h2>
      <UploadBlock />
      <InfoBlock />
    </section>
  );
};

export default Section;
