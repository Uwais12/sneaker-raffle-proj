import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainContent from './MainContent';
import Header from './components/Header';
import { UserContextProvider } from './context/UserContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <BrowserRouter>
          <div className="min-h-screen font-inter flex flex-col relative overflow-hidden bg-black">
            <Header />
            <MainContent />
            <footer className="z-10 bg-gray-800 border-t border-gray-200 text-white">
              <div className="container mx-auto px-6 py-4">
                <p className="text-center text-sm">&copy; 2023 Sneaker Raffles. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </BrowserRouter>
        <ToastContainer />
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
