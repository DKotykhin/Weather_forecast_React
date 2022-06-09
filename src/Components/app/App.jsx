import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "../../pages/MainPage";
import Page404 from "../../pages/Page404";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;
