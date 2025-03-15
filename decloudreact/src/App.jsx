import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import FinalProcessing from "./pages/FinalProcessing/FinalProcessing";
import Processing from './pages/Processing/Processing';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/final-processing" element={<FinalProcessing />} />
        <Route path="/processing" element={<Processing />} />
      </Routes>
    </Router>
  );
};

export default App;