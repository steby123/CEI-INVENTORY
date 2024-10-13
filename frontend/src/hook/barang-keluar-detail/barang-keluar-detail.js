import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';

export const BarangKeluarDetailHook = () => {
    const [dataBarangKeluarDetail, setDataBarangKeluarDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [tanggalMasuk, setTanggalMasuk] = useState(''); 
    const [tanggalKeluar, setTanggalKeluar] = useState(''); 
    const itemsPerPage = 10;

    const filteredDataBarangKeluarDetail = dataBarangKeluarDetail.filter(item => 
        item.PartName.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredDataBarangKeluarDetail.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = filteredDataBarangKeluarDetail.slice(indexOfFirstItem, indexOfLastItem);

    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); 
    };

    const handleNextPage = async() => {
        setLoading(true)
        try{
            if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
                await fetchDataOutComingDetail();
            } else{
                console.log('Fail to go to next page');
            }
        }catch(err){
            throw new Error(err.message);
        }finally{
            setLoading(false)
        }
    };

    const handlePreviousPage = async() => {
        setLoading(true)
        try{
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                await fetchDataOutComingDetail()
            } else {
                console.log('Fail to go to previous page')
            }
        }catch(err){
            throw new Error(err.message)
        }finally{
            setLoading(false)
        }
    };

    const navigateHandler = () => {
        navigate('/outcoming');
    };

    const fetchDataOutComingDetail = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                tanggal_masuk: tanggalMasuk,
                tanggal_keluar: tanggalKeluar,
            }).toString();

            console.log(`Fetching data with params: ${queryParams}`);
            const res = await fetch(`http://localhost:3000/Barang-keluar-detail?${queryParams}`);
            if (!res.ok) {
                if (res.status === 404) {
                    console.error('Resource not found (404)');
                }
                throw new Error('Failed to fetch data');
            }
            const result = await res.json();

            if (Array.isArray(result)) {
                setDataBarangKeluarDetail(result);
            } else {
                console.error('Unexpected data structure:', result);
            }
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const submitTanggalHandler = (e) => {
        e.preventDefault();
        fetchDataOutComingDetail(); 
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options).replace(/\s/g, '-');
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(dataBarangKeluarDetail);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data Barang Keluar Detail');
        XLSX.writeFile(wb, 'Data_Barang_Keluar_Detail.xlsx');
    };

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0
        }).format(amount);
    };

    const TanggalMasukHandler = (e) => {
        setTanggalMasuk(e.target.value);
    };

    const TanggalKeluarHandler = (e) => {
        setTanggalKeluar(e.target.value);
    };

    useEffect(() => {
        fetchDataOutComingDetail(); 
    }, []);

    return {
        search,
        loading,
        currentPage,
        totalPages,
        currentItem,
        tanggalMasuk, 
        tanggalKeluar,
        dataBarangKeluarDetail,
        exportToExcel,
        formatPrice,
        formatDate,
        handleNextPage,
        handlePreviousPage,
        navigateHandler,
        handleSearchChange,
        submitTanggalHandler, 
        TanggalMasukHandler, 
        TanggalKeluarHandler,
    };
};
