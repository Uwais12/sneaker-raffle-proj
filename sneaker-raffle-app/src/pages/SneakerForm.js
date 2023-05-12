import React, { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import api from '../api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const createSneaker = async (newSneaker) => {
    const { data } = await api.post('/api/sneakers', newSneaker);
    return data;
};

const SneakerForm = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const queryClient = useQueryClient();

    const mutation = useMutation(createSneaker, {
        onSuccess: () => {
            queryClient.invalidateQueries('sneakers');
            toast.success("Sneaker added successfully");
            clearForm();
        },
        onError: () => {
            toast.error("An error occurred while adding the sneaker");
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        mutation.mutate({ name, brand, releaseDate, imageUrl });
    }

    const clearForm = () => {
        setName('');
        setBrand('');
        setReleaseDate('');
        setImageUrl('');
    }


    return (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 w-full">
            <h3 className="text-lg font-semibold mb-2">Add New Sneaker</h3>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border p-2 w-full" />
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" className="border p-2 w-full" />
            <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} placeholder="Release Date" className="border p-2 w-full" />
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" className="border p-2 w-full" />
            <button type="submit" className="bg-blue-500 text-white p-2 w-full">Add Sneaker</button>
        </form>
    );

}

export default SneakerForm;
