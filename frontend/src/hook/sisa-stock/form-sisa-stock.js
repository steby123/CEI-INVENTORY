import { useState } from "react";

export const FormSisaStockHook = () => {
    const [showPopUp, setShowPopUp] = useState(false);
    const [stockDetails, setStockDetails] = useState([]);
    const [formData, setFormData] = useState({partNumber:'', partName:'', uom:''}); 
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(event) => {
        event.preventDefault();
        const { partName, partNumber, uom } = formData;

        setLoading(true);
        try{
            const response = await fetch(`http://localhost:3000/Sisa-stock-detail?partName=${partName}&partNumber=${partNumber}&uom=${uom}`);
            if (!response.ok) {
                if (response.status === 404) {
                    console.error('Resource not found (404)');
                }
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data)
            setStockDetails(data);
            setShowPopUp(true)
        }catch(err){
            alert(`Error: ${err.message}`);
            console.log(err.message);
        } finally{
            setLoading(false);
        }
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const closePopUpHandler = () => {
        setShowPopUp(false);
        setStockDetails([]);
        setFormData({ 
            partNumber: '', 
            partName: '', 
            uom: '' 
        });
    };

    return{
        showPopUp,
        stockDetails,
        loading,
        handleSubmit,
        changeHandler,
        closePopUpHandler
    }
}