import { useState } from "react";

export const FormBarangKeluarHook = () => {
    const [formLoading, setFormLoading] = useState(false);
    const [FormBarangKeluar, setFormBarangKeluar] = useState({
        tanggal:'',
        doc_no:'',
        part_number:'',
        part_name:'',
        uom:'',
        qty:''
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormBarangKeluar({
            ...FormBarangKeluar,
            [name]: value
        })
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log(FormBarangKeluar);

        setFormLoading(true)
        try{
            const res = await fetch('http://localhost:3000/Barang-keluar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(FormBarangKeluar),
            })
            const result = await res.json();
            console.log(result)
            if(res.ok){
                setFormBarangKeluar({tanggal:'', doc_no:'',part_number:'',part_name:'',uom:'',qty:''});
            }else{
                console.log('Error', result.message)
            }
        }catch(err){
            throw new Error(err.message);
        }finally{
            setFormLoading(false)
        }
    }

    return{
        FormBarangKeluar,
        formLoading,
        changeHandler,
        submitHandler
    }
}