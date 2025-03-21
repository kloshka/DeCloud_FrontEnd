import "./Processing.css";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Gallery from '../../components/Gallery/Gallery';
import Header from '../../components/Header/Header';
import Buttons from '../../components/Common/Buttons/Buttons';
import BackGroundCloud from "../../components/Background/BackGroundCloud";

const Processing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

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

  const handleProcessFiles = async () => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      const response = await fetch('/api/process-files', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Ошибка при отправке файлов');

      const result = await response.json();
      console.log('Файлы успешно отправлены:', result);

      // Переход на страницу после успешной отправки
      navigate('/final-processing');
    } catch (error) {
      console.error('Ошибка:', error.message);
    }
  };

  return (
    <div className="processing-page">
      <BackGroundCloud />
      <Header />
      <Gallery files={files} onRemove={handleRemoveFile} />
      <Buttons onAddFiles={handleAddFiles} onProcessFiles={handleProcessFiles} />
    </div>
  );
};

export default Processing;
