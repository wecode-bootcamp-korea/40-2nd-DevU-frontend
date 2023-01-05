import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import CategoryMenu from './pages/CategoryMenu/CategoryMenu';
import Detail from './pages/Detail/Detail';
import List from './pages/List/List';
import Main from './pages/Main/Main';
import MyLibrary from './pages/MyLibrary/MyLibrary';
import Order from './pages/Order/Order';
import Footer from './components/Footer/Footer';
import Auth from './pages/Login/Auth';

const RouteWithNavFooter = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list/:id" element={<List />} />
        <Route path="/books/details/:id" element={<Detail />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/users/kakao/signin" element={<Auth />} />
        <Route path="/mylibrary" element={<MyLibrary />} />
        <Route path="/categorymenu" element={<CategoryMenu />} />
      </Routes>
      <Footer />
    </>
  );
};

export default RouteWithNavFooter;
