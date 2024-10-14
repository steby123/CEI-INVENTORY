import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';

export const useBarangMasuk = () => {
    const [dataBarangMasuk, setDataBarangMasuk] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [formLoading, setFormLoading] = useState(false);
    const [formBarangMasuk, setFormBarangMasuk] = useState({
        tanggal: '',
        doc_no: '',
        part_number: '',
        part_name: '',
        uom: '',
        qty: '',
        divisionCode: '',
        divisionName: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const itemsPerPage = 10;

    // Fetch Data
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/Barang-masuk');
            if (!res.ok) {
                if (res.status === 404) {
                    console.error('Resource not found (404)');
                }
                throw new Error('Failed to fetch data');
            }
            const result = await res.json();
            setDataBarangMasuk(result);
        } catch (err) {
            console.error('Error fetching data:', err.message);
        } finally {
            setLoading(false);
        }
    };

    // Form Handlers
    const barangMasukHandler = (e) => {
        const { name, value } = e.target;
        setFormBarangMasuk(prevState => ({ 
            ...prevState, 
            [name]: value 
        }));
    };

    const submitBarangMasukHandler = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            const response = await fetch('http://localhost:3000/Barang-masuk', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formBarangMasuk)
            });
            if (response.ok) {
                await fetchData();
                setFormBarangMasuk({
                    tanggal: '',
                    doc_no: '',
                    part_number: '',
                    part_name: '',
                    uom: '',
                    qty: '',
                    divisionCode: '',
                    divisionName: '',
                });
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to submit form');
                console.log(errorData);
            }
        } catch (err) {
            console.error('Error:', err.message);
            setErrorMessage('An error occurred while submitting the form.')
        } finally {
            setFormLoading(false);
        }
    };

    // Pagination Handlers
    const handleNextPage = async() => {
        setLoading(true)
        try{
            if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
                await fetchData();
            } else {
                console.log('Fail to go to next page');
            }
        }catch(err){
            throw new Error(err.message)
        }finally{
            setLoading(false)
        }
    };

    const handlePreviousPage = async() => {
        setLoading(true)
        try{
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                await fetchData();
            } else {
                console.log('Fail to go to previous page');
            }
        }catch(err){
            throw new Error(err.message)
        }finally{
            setLoading(false)
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    // Filter Data
    const filteredData = dataBarangMasuk.filter(item =>
        item.doc_no.toLowerCase().includes(search.toLowerCase()) ||
        item.part_number.toLowerCase().includes(search.toLowerCase()) ||
        item.part_name.toLowerCase().includes(search.toLowerCase()) ||
        item.divisionCode.toLowerCase().includes(search.toLowerCase()) || 
        item.divisionName.toLowerCase().includes(search.toLowerCase())
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Edit and Delete Handlers
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/Barang-masuk/${id}`, { 
                method: 'DELETE' 
            });
            if (res.ok) {
                fetchData()
            }else {
                console.log('Failed to delete data');
            }
        } catch (err) {
            console.error('Error deleting item:', err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    const handleUpdate = () => {
        fetchData();
        setSelectedItem(null);
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
        };
        return date.toLocaleDateString('id-ID', options).replace(/\s/g, '-');
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
        formBarangMasuk,
        formLoading,
        selectedItem,
        currentPage,
        search,
        loading,
        currentItems,
        totalPages,
        errorMessage,
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
        barangMasukHandler,
        submitBarangMasukHandler,
    };
};
