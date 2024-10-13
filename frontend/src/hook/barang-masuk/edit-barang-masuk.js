import { useState, useEffect } from "react";

export const EditBarangMasukHook = (item, onUpdate, onClose) => {
    const [editLoading, setEditLoading] = useState(false);
    const [formData, setFormData] = useState({
        tanggal: '',
        docNo: '',
        partNumber: '',
        partName: '',
        uom: '',
        qty: '',
    });

    useEffect(() => {
        if (item) {
            setFormData({
                tanggal: item.tanggal || '',
                docNo: item.doc_no || '',
                partNumber: item.part_number || '',
                partName: item.part_name || '',
                uom: item.uom || '',
                qty: item.qty || '',
            });
            }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEditLoading(true)
        try {
            const res = await fetch(`http://localhost:3000/Barang-masuk/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify(formData),
                });
                if (res.ok) {
                   await onUpdate();
                   onClose();
                } else {
                    console.log('Failed to update data');
                }
        } catch (err) {
            console.error(err.message);
        } finally{
            setEditLoading(false)
        }
    };

    return{
        formData,
        editLoading,
        handleChange,
        handleSubmit
    }
}