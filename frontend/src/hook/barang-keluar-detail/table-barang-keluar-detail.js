import * as XLSX from 'xlsx';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const TableBarangKeluarDetailHook = () => {
    const [dataBaranKeluarDetail, setDataBarangKeluarDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const itemsPerPage = 20;

    const filteredDataBarangKeluarDetail = dataBaranKeluarDetail.filter(item => 
        item.PartName.toLowerCase().includes(search.toLowerCase())
    )

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDataBarangKeluarDetail.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredDataBarangKeluarDetail.length / itemsPerPage);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1)
    }

    const handleNextPage = async() => {
        try{
            if (currentPage < totalPages) {
                setLoading(true);
                setCurrentPage(currentPage + 1);
                await fetchDataOutComingDetail();
               
            }
        }catch(err){
            throw new Error(err.message);
        }finally{
            setLoading(false);
        }
    };

    const handlePreviousPage = async() => {
        try{
            if (currentPage > 1) {
                setLoading(true);
                setCurrentPage(currentPage - 1);
                await fetchDataOutComingDetail();   
            }
        }catch(err){
            throw new Error(err.message);

        }finally{
            setLoading(false);
        }
    };

    const navigateHandler = () => {
        navigate('/outcoming')
    }

    const fetchDataOutComingDetail = async() => {
        setLoading(true);
        try{
            const res = await fetch('http://localhost:3000/Barang-keluar-detail');
            const result = await res.json();
            setDataBarangKeluarDetail(result);
        }catch(err){
            console.log(err.message);
            throw new Error(err.messsage);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDataOutComingDetail();
    },[])

    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options).replace(/\s/g, '-');
    };

    const exportToExcel = () => {
        // Prepare data for the Excel file
        const ws = XLSX.utils.json_to_sheet(dataBaranKeluarDetail);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data Barang Keluar Detail');

        // Export the workbook to a file
        XLSX.writeFile(wb, 'Data_Barang_Keluar_Detail.xlsx');
    };

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0
        }).format(amount);
    };

    return{
        search,
        loading,
        currentPage,
        totalPages,
        currentItems,
        filteredDataBarangKeluarDetail,
        exportToExcel,
        formatPrice,
        formatDate,
        handleNextPage,
        handlePreviousPage,
        navigateHandler,
        handleSearchChange,
    }
}