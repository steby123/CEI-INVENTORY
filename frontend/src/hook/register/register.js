import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterHook = () => {
    const [registerData, setRegisterData] = useState({username:'', password:''});
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value
        }))
        setErrorMessage('');
    }   

    const registerHandler = async(e) => {
        e.preventDefault();
        console.log(e.target);

        setLoading(true)
        try{
            const res = await fetch('http://localhost:3000/register',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData)
            });

            if(!res.ok){
                const message = await res.json();
                setErrorMessage(message.message);
                throw new Error(message);
            }

            navigate('/')

            const result = await res.text();
            console.log(result);

        }catch(err){
            setErrorMessage('An unexpected error occurred.');
            throw new Error(err.message);
        }finally{
            setLoading(false)
        }
    }

    return{
        loading,
        registerData,
        errorMessage,
        changeHandler,
        registerHandler
    }
}