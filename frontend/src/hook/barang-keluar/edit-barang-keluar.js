import { useEffect, useState } from 'react';

export const EditBarangKeluarHook = (item, onUpdate) => {
    const [editLoading, setEditLoading] = useState(false);
    const [formData, setFormData] = useState({
        tanggal: '',
        divisionCode: '',
        divisionName: '',
        doc_no: '',
        part_number: '',
        part_name: '',
        uom: '',
        qty: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (item) {
            setFormData({
                tanggal: item.tanggal,
                divisionCode: item.divisionCode,
                divisionName: item.divisionName,
                doc_no: item.doc_no,
                part_number: item.part_number,
                part_name: item.part_name,
                uom: item.uom,
                qty: item.qty,
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
        setEditLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/Barang-keluar/${item.id}`, {
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
                setErrorMessage(error.message || 'Failed to update item');
                console.log('Failed to update data');
            }
        } catch (err) {
            setErrorMessage('An error occurred while submitting the form.')
            console.error(err.message);
        }finally{
            setEditLoading(false);
        }
    };

    return{
        formData,
        editLoading,
        errorMessage,
        handleChange,
        handleSubmit,
    }
}