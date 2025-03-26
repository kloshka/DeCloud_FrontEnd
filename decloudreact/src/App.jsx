import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import FinalProcessing from "./pages/FinalProcessing/FinalProcessing";
import Processing from './pages/Processing/Processing';
import DownloadPage from "./pages/DownloadPage/DownloadPage";
import History from "./pages/History/History";
import "./assets/global.css";
import "./assets/mobileWarning.css"; 

const App = () => {
  return (
    <>
      <div className="mobile-warning">
        <h1>Пожалуйста, откройте сайт на компьютере</h1>
        <p>Это приложение не поддерживает мобильные устройства</p>
      </div>
      <div className="router-content">
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/final-processing" element={<FinalProcessing />} />
            <Route path="/processing" element={<Processing />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/history" element={<History/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;