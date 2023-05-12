import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import api from '../api'
import Select from 'react-select'
import Creatable from 'react-select/creatable';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const createRaffle = async (newRaffle) => {
    const { data } = await api.post('/api/raffles', newRaffle);
    return data;
};

const RaffleForm = ({ sneakers, raffles = [] }) => {
    const [sneaker, setSneaker] = useState(null);
    const [name, setName] = useState('');
    const [region, setRegion] = useState(null);
    const [type, setType] = useState('');
    const [entryMethod, setEntryMethod] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isShipped, setIsShipped] = useState(false);
    const [url, setUrl] = useState('');
    const queryClient = useQueryClient();

    const mutation = useMutation(createRaffle, {
        onSuccess: () => {
            queryClient.invalidateQueries('raffles');
            toast.success("Raffle added successfully");
            clearForm();
        },
        onError: () => {
            toast.error("An error occurred while adding the raffle");
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        mutation.mutate({ sneakerId: sneaker?.value, name, region: region?.value, type, entryMethod, startDate, endDate, isShipped, url });
    }

    const clearForm = () => {
        setSneaker(null);
        setName('');
        setRegion('');
        setType('');
        setEntryMethod('');
        setStartDate('');
        setEndDate('');
        setIsShipped(false);
        setUrl('');
    }

    const sneakerOptions = sneakers.map(sneaker => ({ value: sneaker.id, label: `${sneaker.id} | ${sneaker.name} | ${sneaker.brand}` }));

    return (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 w-full">
            <h3 className="text-lg font-semibold mb-2">Add New Raffle</h3>
            <Select
                value={sneaker}
                onChange={setSneaker}
                options={sneakerOptions}
                placeholder="Select Sneaker"
                className="mb-2 w-full"
            />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border p-2 w-full" />
            <Creatable
                value={region}
                onChange={setRegion}
                options={Array.from(new Set(raffles.map(raffle => raffle.region))).map(region => ({ value: region, label: region }))}
                className="mb-2 w-full"
            />
            <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Region" className="border p-2 w-full" />
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" className="border p-2 w-full" />
            <input type="text" value={entryMethod} onChange={(e) => setEntryMethod(e.target.value)} placeholder="Entry Method" className="border p-2 w-full" />
            <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" className="border p-2 w-full" />
            <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" className="border p-2 w-full" />


            <div className="flex items-center mb-2">
                <input type="checkbox" checked={isShipped} onChange={(e) => setIsShipped(e.target.checked)} className="mr-2" />
                <label>Is Shipped</label>
            </div>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" className="border p-2 w-full" />
            <button type="submit" className="bg-blue-500 text-white p-2 w-full">Add Raffle</button>
        </form>
    );
}

export default RaffleForm;
