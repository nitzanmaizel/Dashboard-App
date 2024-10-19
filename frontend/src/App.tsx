import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import SheetPage from '@/pages/SheetPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/sheet/:id' element={<SheetPage />} />
    </Routes>
  );
};

export default App;
