import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import SneakerList from './SneakerList';
import Hero from './Hero';
import Newsletter from './Newsletter';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import Admin from './Admin';
import Profile from './Profile';
import { ProtectedWrapper, PublicOnlyWrapper } from './Wrappers';

function MainContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full">

        {location.pathname === '/' && <Hero />}
        <main className="container mx-auto px-6 py-6 flex-grow">
          <Routes>
            <Route exact path="/" element={<SneakerList />} />
            <Route
              path="/login"
              element={(
                <PublicOnlyWrapper>
                  <Login />
                </PublicOnlyWrapper>
              )}
            />
            <Route
              path="/register"
              element={(
                <PublicOnlyWrapper>
                  <Register />
                </PublicOnlyWrapper>
                          )}
            />
            <Route
              path="/profile"
              element={(
                <ProtectedWrapper requiredRole="ROLE_USER">
                  <Profile />
                </ProtectedWrapper>
              )}
            />
            <Route
              path="/admin"
              element={(
                <ProtectedWrapper requiredRole="ROLE_ADMIN">
                  <Admin />
                </ProtectedWrapper>
                          )}
            />
            <Route
              path="/logout"
              element={(
                <ProtectedWrapper requiredRole="ROLE_USER">
                  <Logout />
                </ProtectedWrapper>
                          )}
            />

          </Routes>
        </main>
        {location.pathname === '/' && <Newsletter />}
      </div>
    </div>
  );
}

export default MainContent;
