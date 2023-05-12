import { useState, useEffect, useMemo } from 'react';
import useAuth from './useAuth';

const useUser = () => {
    const { fetchCurrentUser } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const memoizedFetchCurrentUser = useMemo(() => fetchCurrentUser, []);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                const currentUser = await memoizedFetchCurrentUser();
                setUser(currentUser);
            }
            setLoading(false);
        };

        fetchUser();
    }, [memoizedFetchCurrentUser]);


    return { user, loading }; // Return user and loading
};

export default useUser;
