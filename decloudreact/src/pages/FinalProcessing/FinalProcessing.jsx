import './FinalProcessing.css';
import Logo from '../../components/Logo';
import Loader from '../../components/Loader';


function FinalProcessing() {
    return (
        <div className="body_final">
            <Logo />
            <div className="text">Обрабатываем ваши изображения...</div>
            <Loader />
        </div>
    );
}

export default FinalProcessing;
