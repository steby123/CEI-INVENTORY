import { useState, useEffect } from "react";

export const errorHook = () => {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            try{    
                const response = await fetch('http://localhost:3000/api/data');
                if(!response.ok){
                    if(response.status === 404){
                        throw new Error('404 - Page Not Found');
                    }else if(response.status === 500){
                        throw new Error('500 - Internal Server Error');
                    }else{
                        throw new Error(`Error: ${response.status}`);
                    }
                }
                const result = await response.json();
                setMessage(result.message);
            }catch(err){
                console.error('Error fetching data:', err.message);
                setError(err.message);
            }finally{
                setLoading(false)
            }
        }

        fetchData();
    },[])

    return{
        message,
        error,
        loading  
    }
}