import { useState } from "react";

export const BarangMasukHook = () => {
    const [formLoading, setFormLoading] = useState(false);
    const [formBarangMasuk, setFormBarangMasuk] = useState({
        tanggal:'',
        doc_no:'',
        part_number:'',
        part_name:'',
        uom: '',
        qty: ''
    });

    const barangMasukHandler = (e) => {
        const {name, value} = e.target;
        setFormBarangMasuk(prevState => ({
            ...prevState, 
            [name]: value}
        ));
    }

    const submitBarangMasukHandler = async(e) => {
        e.preventDefault();
        console.log(formBarangMasuk);

        setFormLoading(true);
        try{
            const response = await fetch('http://localhost:3000/Barang-masuk', {
                method:'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formBarangMasuk)
            })
            const result = await response.json();
            console.log(result)
            if (response.ok) {
                setFormBarangMasuk({tanggal:'', doc_no:'',part_number:'',part_name:'',uom:'',qty:''});

            }else {
                // Handle errors from the server
                console.error('Error:', result.message);
            }
        }catch(err){
            console.log(err)
            throw new Error(err.message);
        }finally{
            setFormLoading(false)
        }
    }

    return{
        barangMasukHandler,
        submitBarangMasukHandler,
        formBarangMasuk,
        formLoading
    }
}