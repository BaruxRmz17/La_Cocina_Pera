import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import HomeResponsive from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="font-sans text-gray-900">
        <Routes>
          <Route path="/" element={<HomeResponsive />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;