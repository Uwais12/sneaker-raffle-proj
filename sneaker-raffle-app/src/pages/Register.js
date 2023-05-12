// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';

// const Register = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const { registerUser } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         if (password !== confirmPassword) {
//             setError('Passwords do not match.');
//             return;
//         }

//         try {
//             await registerUser(email, password);
//             navigate("/login")
//         } catch (err) {
//             console.log(err)
//             setError('Failed to create account.');
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden mx-auto">
//                 <div className="w-1/2 bg-gray-100 p-8">
//                     <h2 className="text-3xl font-bold text-gray-800">Join Us Today!</h2>
//                     <p className="text-gray-600 mt-4">Discover the incredible features we offer. Register now and start your journey with us. Be a part of our community and let's grow together!</p>
//                 </div>
//                 <div className="w-1/2 p-8">
//                     <h2 className="text-center text-3xl font-bold text-gray-800">Register</h2>
//                     {error && <p className="text-red-500 text-center">{error}</p>}
//                     <form onSubmit={handleSubmit} className="mt-8">
//                         <div>
//                             <label htmlFor="email" className="text-sm font-bold text-gray-600">Email</label>
//                             <input
//                                 id="email"
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
//                                 required
//                             />
//                         </div>
//                         <div className="mt-4">
//                             <label htmlFor="password" className="text-sm font-bold text-gray-600">Password</label>
//                             <input
//                                 id="password"
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
//                                 required
//                             />
//                         </div>
//                         <div className="mt-4">
//                             <label htmlFor="confirmPassword" className="text-sm font-bold text-gray-600">Confirm Password</label>
//                             <input
//                                 id="confirmPassword"
//                                 type="password"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
//                                 required
//                             />
//                         </div>
//                         <button type="submit" className="w-full mt-6 bg-black text-white font-bold py-2 rounded">
//                             Register
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { motion } from 'framer-motion';
import Blob from '../components/Blob';
import ThreeDComponent from '../components/ThreeDComponent';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { registerUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await registerUser(email, password);
            navigate("/login")
        } catch (err) {
            console.log(err)
            setError('Failed to create account.');
        }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Blob />
            <ThreeDComponent />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto py-24 lg:py-32">
                <div className="relative">
                    <motion.div
                        className="bg-gray-800 rounded-lg shadow-2xl p-8 md:p-16 text-white z-10 unusual-font"
                        initial={{ x: '-100vw' }}
                        animate={{ x: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    >
                        <h2 className="text-4xl font-bold mb-4">Join Our Creative Community</h2>
                        <p className="text-gray-300 mb-8">Unleash your creativity and start sharing your unique ideas with the world. Register now and become a part of our vibrant community!</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="input-animation">
                                <label htmlFor="email" className="text-sm font-bold text-gray-400">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 text-sm border-0 rounded bg-gray-700 text-white mt-2"
                                    required
                                />
                            </div>
                            <div className="input-animation">
                                <label htmlFor="password" className="text-sm font-bold text-gray-400">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 text-sm border-0 rounded bg-gray-700 text-white mt-2"
                                    required
                                />
                            </div>
                            <div className="input-animation">
                                <label htmlFor="confirmPassword" className="text-sm font-bold text-gray-400">Confirm
                                    Password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 text-sm border-0 rounded bg-gray-700 text-white mt-2"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full mt-6 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold py-2 rounded hover:scale-110 transition-transform duration-200">
                                Register
                            </button>
                            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                        </form>
                    </motion.div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                </div>
                <div className="flex items-center justify-center text-center text-white">
                    <motion.div
                        className="text-center"
                        initial={{ y: '100vh' }}
                        animate={{ y: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    >
                        <h2 className="text-4xl font-bold mb-4">Become a Part of Our Journey</h2>
                        <p className="text-xl">Join our community and explore endless possibilities. Express yourself, learn, and grow with us.</p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Register;
