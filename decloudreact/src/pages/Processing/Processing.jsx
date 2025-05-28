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
    try {
      const presignedResponse = await fetch('http://81.163.31.53/v1/api/get-presigned-url/');
      if (!presignedResponse.ok) throw new Error('Ошибка при получении presigned URL');
      const { task_id } = await presignedResponse.json();
      console.log('Получен task_id:', task_id);
  
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
  
        const uploadResponse = await fetch(`http://81.163.31.53/v1/api/image/get-processed/{task_id}/`, {
          method: 'POST',
          body: formData,
        });
  
        if (!uploadResponse.ok) {
          throw new Error(`Ошибка при загрузке файла: ${file.name}`);
        }
  
        console.log(`${file.name} успешно загружен`);
      }
  
      navigate('/final-processing', { state: { task_id } });
  
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
