import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import RoutWithoutNavFooter from './RoutWithoutNavFooter';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<RoutWithoutNavFooter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
