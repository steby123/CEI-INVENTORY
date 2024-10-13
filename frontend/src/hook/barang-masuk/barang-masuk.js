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
        qty: ''
    });
    const itemsPerPage = 10;

    // Fetch Data
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/Barang-masuk');
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
        setFormBarangMasuk(prevState => ({ ...prevState, [name]: value }));
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
                    qty: ''
                });
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (err) {
            console.error('Error:', err.message);
        } finally {
            setFormLoading(false);
        }
    };

    // Pagination Handlers
    const handleNextPage = () => {
        setLoading(true)
        try{
            if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
                setCurrentPage(currentPage + 1);
            } else {
                console.log('Fail to go to next page');
            }
        }catch(err){
            throw new Error(err.message)
        }finally{
            setLoading(false)
        }
    };

    const handlePreviousPage = () => {
        setLoading(true)
        try{
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
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
        item.part_name.toLowerCase().includes(search.toLowerCase())
    );
    const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Edit and Delete Handlers
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/Barang-masuk/${id}`, { method: 'DELETE' });
            if (res.ok) fetchData();
        } catch (err) {
            console.error('Error deleting item:', err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => setSelectedItem(item);

    const handleUpdate = async (item, updatedData) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/Barang-masuk/${item.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            if (res.ok) fetchData();
        } catch (err) {
            console.error('Error updating item:', err.message);
        } finally {
            setLoading(false);
            setSelectedItem(null);
        }
    };

    const handleClose = () => setSelectedItem(null);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(dataBarangMasuk);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data Barang Masuk');
        XLSX.writeFile(wb, 'Data_Barang_Masuk.xlsx');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options).replace(/\s/g, '-');
    };

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0 }).format(amount);
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
