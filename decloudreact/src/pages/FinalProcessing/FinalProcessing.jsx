import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../components/Header/Logo';
import Loader from '../../components/Common/Loader/Loader';
import BackGroundCloud from "../../components/Background/BackGroundCloud";

function FinalProcessing() {
    const navigate = useNavigate();
    const location = useLocation();
    const task_id = location.state?.task_id;

    useEffect(() => {
        if (!task_id) {
            console.error("task_id не передан");
            return;
        }

        const intervalId = setInterval(async () => {
            try {
                // 1. Проверяем статус обработки
                const statusResponse = await fetch(`http://81.163.31.53/v1/api/mock/image/status/${task_id}/`);
                if (!statusResponse.ok) throw new Error('Ошибка при получении статуса обработки');
                const statusData = await statusResponse.json();
                console.log('Статус обработки:', statusData);

                if (statusData.status === 'completed') {
                    clearInterval(intervalId);

                    // 2. Получаем обработанные файлы
                    const processedResponse = await fetch(`http://81.163.31.53/v1/api/mock/image/get-processed/${task_id}/`);
                    if (!processedResponse.ok) throw new Error('Ошибка при получении обработанных файлов');
                    const processedData = await processedResponse.json();
                    console.log('Обработанные файлы:', processedData);

                    // 3. Переход на страницу скачивания
                    navigate('/download', { state: { files: processedData.files } });
                }
            } catch (error) {
                console.error('Ошибка:', error.message);
            }
        }, 3000); // опрос каждые 3 секунды

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
    }, [navigate, task_id]);

    return (
        <div className="processing-page body_final">
            <BackGroundCloud />
            <Logo />
            <div className="text">Обрабатываем ваши изображения...</div>
            <Loader />
        </div>
    );
}

export default FinalProcessing;
