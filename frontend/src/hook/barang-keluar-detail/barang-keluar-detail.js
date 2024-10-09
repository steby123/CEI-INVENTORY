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
    const [currentItem, setCurrentItem] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const itemsPerPage = 20;

    const filteredDataBarangKeluarDetail = dataBarangKeluarDetail.filter((item) => {
        return item.PartName.toLowerCase().includes(search.toLowerCase());
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleNextPage = async () => {
        if (currentPage < totalPages) {
            setLoading(true);
            setCurrentPage(currentPage + 1);
            await fetchDataOutComingDetail();
        }
    };

    const handlePreviousPage = async () => {
        if (currentPage > 1) {
            setLoading(true);
            setCurrentPage(currentPage - 1);
            await fetchDataOutComingDetail();
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
                const result = await res.json();
                console.log('Hook Load');
            if (Array.isArray(result)) {
                setDataBarangKeluarDetail(result);

                let filter = result.slice(indexOfFirstItem, indexOfLastItem);
                setCurrentItem(filter);
                setTotalPages(Math.ceil(filter.length / itemsPerPage));
                setLoading(false);
            } else {
                console.error('Unexpected data structure:', result);
            }
        } catch (err) {
            console.error(err.message);
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
        console.log('Effect');
    }, []);

    return {
        search,
        loading,
        currentPage,
        totalPages,
        currentItem,
        tanggalMasuk, 
        tanggalKeluar, 
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
        dataBarangKeluarDetail
    };
};
