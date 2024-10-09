import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginHook = ({setIsAuthenticated}) => {
    const [data, setData] = useState({username:'', password: ''});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitHandler = async(event) => {
        event.preventDefault();
        console.log('Submit login', data);

        if(!data.username || !data.password){
            alert("Username and password are required.");
            return;
        }

        setLoading(true)
        try{
            const response = await fetch('http://localhost:3000/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            });

            if(!response.ok){
                const message = await response.json();
                throw new Error(message.message || 'An error occured during login.');
            }

            const result = await response.json();
            localStorage.setItem('token', result.token);
            console.log('Login successful:', result);
            setIsAuthenticated(true);
            navigate('/');
            
        }catch(err){
            console.log(err.message);
            alert(err.message)
        }finally{
            setLoading(false)
        }
    }

    return{
        loading,
        handleChange,
        submitHandler
    }
}