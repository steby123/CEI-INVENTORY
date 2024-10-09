import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';

export const TableBarangMasukHook = () => {
    const [dataBarangMasuk, setDataBarangMasuk] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/Barang-masuk');
            const result = await res.json();
            setDataBarangMasuk(result);
        } catch (err) {
            console.error('Error fetching data:', err.message);
            // Optional: Set an error state here
        } finally{
            setLoading(false)
        }
    };

    const filteredData = dataBarangMasuk.filter(item =>
        item.doc_no.toLowerCase().includes(search.toLowerCase()) ||
        item.part_number.toLowerCase().includes(search.toLowerCase()) ||
        item.part_name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleNextPage = async() => {
        try{
            if (currentPage < totalPages) {
                setLoading(true)
                setCurrentPage(currentPage + 1);
                await fetchData();
                
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
                await fetchData();
            }
        }catch(err){
            throw new Error(err.message);
        }finally{
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/Barang-masuk/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchData(); // Re-fetch data after delete
            } else {
                console.error('Failed to delete data');
            }
        } catch (err) {
            console.error('Error deleting item:', err.message);
        }finally{
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    const handleUpdate = () => {
        fetchData(); // Re-fetch data after update
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
        const ws = XLSX.utils.json_to_sheet(dataBarangMasuk);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data Barang Masuk');
        XLSX.writeFile(wb, 'Data_Barang_Masuk.xlsx');
    };

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0
        }).format(amount);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        dataBarangMasuk,
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
        handleSearchChange
    };
};