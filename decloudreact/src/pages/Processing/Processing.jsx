import "./Processing.css";
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Gallery from '../../components/Gallery';
import Header from '../../components/Header';
import Buttons from '../../components/Buttons';

const Processing = () => {
  const location = useLocation();
  const [files, setFiles] = useState([]);

  // Инициализация только при первом монтировании
  useEffect(() => {
    if (location.state?.files) {
      setFiles(location.state.files);
    }
  }, [location.state]);

  const handleRemoveFile = (indexToRemove) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleAddFiles = (newFiles) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  return (
    <div className="processing-page">
      <Header />
      <Gallery files={files} onRemove={handleRemoveFile} />
      <Buttons onAddFiles={handleAddFiles} />
    </div>
  );
};

export default Processing;