import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';

export const TableBarangKeluarHook = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 10;

    const filteredData = data.filter(item =>
        item.doc_no.toLowerCase().includes(search.toLowerCase()) ||
        item.part_number.toLowerCase().includes(search.toLowerCase()) ||
        item.part_name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleNextPage = async() => {
        setLoading(true);
        try{
            if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
                await getFetchData();  
            }
        }catch(err){
            throw new Error(err.message)
        }finally{
            setLoading(false)
        }
    };

    const handlePreviousPage = async() => {
        setLoading(true);
        try{
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                await getFetchData();
            }
        }catch(err){
            throw new Error(err.message);
        }finally{
            setLoading(false);
        }
    };

    const navigationHandler = () => {
        navigate('/Outcoming-detail')
    }

    const getFetchData = async() => {
        setLoading(true);
        try{
            const res = await fetch('http://localhost:3000/Barang-keluar');
            const result = await res.json();
            setData(result);
            console.log(result)
        }catch(err){
            console.log(err.message);
            throw new Error(err.message);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getFetchData();
    },[])

    const handleSearchChange = (e) => {
        setLoading(true);
        try{
            setSearch(e.target.value);
            setCurrentPage(1); // Reset to first page on search
        }catch(err){
            throw new Error(err.message);
        }finally{
            setLoading(false);
        }
    };

    const handleDelete = async(id) => {
        console.log('Deleting ID', id)
        setLoading(true);
        try{
            const res = await fetch(`http://localhost:3000/Barang-keluar/${id}`,{
                method: 'DELETE',
            });
            if(res.ok){
                getFetchData()
            }else{
                console.log('Failed to delete data');
            }
        }catch(err){
            console.log(err.message);
            throw new Error(err.message);
        }finally{
            setLoading(false);
        }
    }

    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    const handleUpdate = () => {
        getFetchData();
        setSelectedItem(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options).replace(/\s/g, '-'); 
    };

    const handleClose = () => {
        setSelectedItem(null);
    };

    const exportToExcel = () => {
        // Prepare data for the Excel file
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data Barang Keluar');

        // Export the workbook to a file
        XLSX.writeFile(wb, 'Data_Barang_Keluar.xlsx');
    };

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0
        }).format(amount);
    };

    return{
        data,
        selectedItem,
        currentPage,
        totalPages,
        currentItems,
        search,
        loading,
        handleDelete,
        handleEdit,
        handleUpdate,
        formatDate,
        handleClose,
        exportToExcel,
        formatPrice,
        handleNextPage,
        handlePreviousPage,
        handleSearchChange,
        navigationHandler
    }
}