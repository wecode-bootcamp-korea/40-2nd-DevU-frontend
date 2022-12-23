import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import CategoryMenu from './pages/CategoryMenu/CategoryMenu';
import Detail from './pages/Detail/Detail';
import List from './pages/List/List';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import MyLibrary from './pages/MyLibrary/MyLibrary';
import Order from './pages/Order/Order';
import Viewer from './pages/Viewer/Viewer';
import Footer from './components/Footer/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<List />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mylibrary" element={<MyLibrary />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="/categorymenu" element={<CategoryMenu />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
