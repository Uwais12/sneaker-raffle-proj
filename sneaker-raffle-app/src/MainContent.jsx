import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import SneakerList from './components/SneakerList';
import Hero from './components/Hero';
import Newsletter from './components/Newsletter';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Admin from './components/Admin';

function MainContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && <Hero />}
      <main className="container mx-auto px-6 py-6 flex-grow">
        <Routes>
          <Route exact path="/" element={<SneakerList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {location.pathname === '/' && <Newsletter />}
    </>
  );
}

export default MainContent;
