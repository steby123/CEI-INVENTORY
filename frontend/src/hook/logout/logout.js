import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LogoutHook = () => {
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async() => {
        setLoading(true);
        try{
            const response = await fetch('http://localhost:3000/logout',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            localStorage.removeItem('username');
            localStorage.removeItem('token');
            window.location.href = '/login';
        }catch(err){
            console.log('Log out Failed', err.message);
            throw new Error(err.message);
        }finally{
            setLoading(false)
        }
    };

    const cancelHandler = () => {
        setLoading(true)
        try{
            console.log('Cancelled');
            navigate('/');
        }catch(err){
            throw new Error(err.message)
        }finally{
            setLoading(false)
        }
    };

    return{
        handleLogout,
        cancelHandler,
        Loading
    }
}