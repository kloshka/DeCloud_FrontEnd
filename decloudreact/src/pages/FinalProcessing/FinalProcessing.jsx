import './FinalProcessing.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Header/Logo';
import Loader from '../../components/Common/Loader/Loader';
import BackGroundCloud from "../../components/Background/BackGroundCloud";

function FinalProcessing() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkServerResponse = async () => {
            try {
                const response = await fetch('/api/get-processed-files');

                if (!response.ok) {
                    throw new Error('Ошибка при получении данных');
                }

                const result = await response.json();
                console.log('Данные успешно получены:', result);

                // Переход на страницу загрузки после получения данных
                navigate('/download', { state: { files: result.files } });
            } catch (error) {
                console.error('Ошибка:', error.message);
            }
        };

        checkServerResponse();
    }, [navigate]);

    return (
        <div className="body_final">
            <BackGroundCloud />
            <Logo />
            <div className="text">Обрабатываем ваши изображения...</div>
            <Loader />
        </div>
    );
}

export default FinalProcessing;
