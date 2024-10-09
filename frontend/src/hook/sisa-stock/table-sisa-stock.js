import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

export const TableSisaStockHook = () => {
    const [sisaDataStock, setSisaDataStock] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/Sisa-stock');
            const data = await response.json();
            setSisaDataStock(data);
        } catch (err) {
            console.error('Error fetching data:', err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = sisaDataStock.filter(item =>
        item.part_number.toLowerCase().includes(search.toLowerCase()) ||
        item.part_name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(sisaDataStock);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data Sisa Stock');
        XLSX.writeFile(wb, 'Data_Sisa_Stock.xlsx');
    };

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0
        }).format(amount);
    };

    return {
        sisaDataStock,
        currentItems,
        currentPage,
        totalPages,
        search,
        loading,
        exportToExcel,
        formatPrice,
        handleNextPage,
        handlePreviousPage,
        handleSearchChange
    }
}