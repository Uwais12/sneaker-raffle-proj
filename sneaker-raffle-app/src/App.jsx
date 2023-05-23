import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainContent from './components/MainContent';
import Header from './components/Header';
import { UserProvider } from './context/UserContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          {/* <div className="min-h-screen font-inter flex flex-col relative overflow-hidden bg-black"> */}
          <div>
            {/* <Header /> */}
            <MainContent />
            {/* <footer className="z-10 bg-gray-800 border-t border-gray-200 text-white"> */}
            <footer>
              <div className="container mx-auto px-6 py-4">
                <p className="text-center text-sm">&copy; 2023 Sneaker Raffles. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </BrowserRouter>
        <ToastContainer />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
