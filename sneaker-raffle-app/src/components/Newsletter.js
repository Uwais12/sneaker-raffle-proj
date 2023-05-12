import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email) {
            toast.error("Please enter a valid email address.");
            return;
        }
        // TODO: Make an API call to save the email
        toast.success("Thanks for subscribing to our newsletter!");
        setEmail('');
    };

    return (
        <section className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white py-12 px-6">
            <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
            <p className="mb-4">Stay updated with the latest sneaker releases and raffles, subscribe to our newsletter.</p>
            <form onSubmit={handleSubmit} className="flex justify-between md:justify-start">
                <input
                    type="email"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="flex-grow rounded bg-gray-100 text-gray-900 p-3 mr-2"
                />
                <button type="submit" className="bg-white text-indigo-500 rounded px-8 py-2 font-bold hover:scale-110 transition-transform duration-200">
                    Subscribe
                </button>
            </form>
        </section>
    );
};

export default Newsletter;
