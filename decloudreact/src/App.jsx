import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import FinalProcessing from "./pages/FinalProcessing/FinalProcessing";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/final-processing" element={<FinalProcessing />} />
      </Routes>
    </Router>
  );
};

export default App;