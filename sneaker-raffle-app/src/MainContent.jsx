import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import SneakerList from './components/SneakerList';
import Hero from './components/Hero';
import Newsletter from './components/Newsletter';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Admin from './components/Admin';
import Profile from './components/Profile';

function MainContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full">

        {location.pathname === '/' && <Hero />}
        <main className="container mx-auto px-6 py-6 flex-grow">
          <Routes>
            <Route exact path="/" element={<SneakerList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />

          </Routes>
        </main>
        {location.pathname === '/' && <Newsletter />}
      </div>
    </div>
  );
}

export default MainContent;
