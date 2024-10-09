import { useState, useEffect } from "react";

export const HomeHook = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try{
                const response = await fetch('http://localhost:3000/');
                if (!response.ok){
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMessage(data.message);
                console.log(data);
            }catch(err){
                console.log('Error fetching data', err)
                setMessage('Error connecting to server')
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[])

    return{
        message,
        loading
    }
}