import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';

export const useBarangKeluar = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [FormBarangKeluar, setFormBarangKeluar] = useState({
        tanggal: '',
        doc_no: '',
        part_number: '',
        part_name: '',
        uom: '',
        qty: ''
    });
    const navigate = useNavigate();
    const itemsPerPage = 10;

    const navigateHandler = () => {
        navigate('/outcoming-detail');
    }

    const filteredData = data.filter(item =>
        item.doc_no.toLowerCase().includes(search.toLowerCase()) ||
        item.part_number.toLowerCase().includes(search.toLowerCase()) ||
        item.part_name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Fetch Data
    const getFetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/Barang-keluar');
            if (!res.ok) {
                if (res.status === 404) {
                    console.error('Resource not found (404)');
                }
                throw new Error('Failed to fetch data');
            }
            const result = await res.json();
            setData(result);
        } catch (err) {
            console.error('Error fetching data:', err.message);
        } finally {
            setLoading(false);
        }
    };

    // Pagination
    const handleNextPage = async () => {
        setLoading(true);
        try{
            if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
                await getFetchData();
            } else {
                console.log('Fail to go to next page');
            }
        }catch(err){
            throw new Error(err.message)
        }finally{
            setLoading(false)
        }
    };

    const handlePreviousPage = async () => {
        setLoading(true);
        try{
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                await getFetchData();
            } else {
                console.log('Fail to go to previous page');
            }
        }catch(err){
            throw new Error(err.message);
        }finally{
            setLoading(false)
        }
    };

    // Form Handlers
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormBarangKeluar((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            const res = await fetch('http://localhost:3000/Barang-keluar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(FormBarangKeluar),
            });
            if (res.ok) {
                await getFetchData();
                setFormBarangKeluar({ tanggal: '', doc_no: '', part_number: '', part_name: '', uom: '', qty: '' });
            } else {
                console.log('Failed to submit form');
            }
        } catch (err) {
            console.error('Error submitting form:', err.message);
        } finally {
            setFormLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    // Edit, Delete, and Update
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/Barang-keluar/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                await getFetchData();
            } else {
                console.log('Failed to delete data');
            }
        } catch (err) {
            console.error('Error deleting data:', err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    const handleUpdate = () => {
        getFetchData();
        setSelectedItem(null);
    };

    const handleClose = () => {
        setSelectedItem(null);
    };

    // Export to Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data Barang Keluar');
        XLSX.writeFile(wb, 'Data_Barang_Keluar.xlsx');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).replace(/\s/g, '-');
    };

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0 }).format(amount);
    };

    useEffect(() => {
        getFetchData();
    }, []);

    return {
        data,
        formLoading,
        FormBarangKeluar,
        selectedItem,
        currentPage,
        totalPages,
        currentItems,
        search,
        loading,
        handleDelete,
        handleEdit,
        handleUpdate,
        handleClose,
        formatDate,
        exportToExcel,
        formatPrice,
        handleNextPage,
        handlePreviousPage,
        handleSearchChange,
        changeHandler,
        submitHandler,
        navigateHandler
    };
};
