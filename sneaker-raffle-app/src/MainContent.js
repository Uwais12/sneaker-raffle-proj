import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import SneakerList from './components/SneakerList';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Admin from './pages/Admin';
import Hero from './components/Hero';
import Newsletter from './components/Newsletter';

const MainContent = () => {
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
