import { useState, useEffect } from "react";

export const EditMasterDataHook = (item, onUpdate) => {
    const [editLoading, setEditLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        partNumber: '',
        partName: '',
        uom: ''
    });

    useEffect(() => {
        if (item) {
            setFormData({
                partNumber: item.partNumber,
                partName: item.partName,
                uom: item.uom
            });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ 
            ...prevData, 
            [name]: value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEditLoading(true)
        try {
            const res = await fetch(`http://localhost:3000/Master-data/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify(formData),
                });
                if (res.ok) {
                    onUpdate();
                } else {
                    const error = await res.json();
                    setErrorMessage(error.message || 'Failed to update');
                    console.log('Failed to update data');
                }
        } catch (err) {
            setErrorMessage('An error occurred while submitting the form.')
            console.error(err.message);
        } finally{
            setEditLoading(false)
        }
    };

    return{
        formData,
        editLoading,
        errorMessage,
        handleChange,
        handleSubmit
    }
}