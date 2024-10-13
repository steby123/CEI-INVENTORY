import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';

export const MasterDataHook = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const itemsPerPage = 10;

    const [formData, setFormData] = useState({
        partNumber: '',
        partName: '',
        uom: ''
    });

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); 
    };

    const filteredData = data.filter(item =>
        item.part_number.toLowerCase().includes(search.toLowerCase()) ||
        item.part_name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleNextPage = () => {
        try{
            setLoading(true);
            if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
            } else {
                console.log('Fail to go to next page');
            }
        }catch(err){
            throw new Error(err.message);
        }finally{
            setLoading(false);
        }
    };

    const handlePreviousPage = () => {
        setLoading(true);
        try{
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                console.log('Fail to go to previous page');
            }
        }catch(err){
            throw new Error(err.message);
        }finally{
            setLoading(false);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/Master-data');
            if(!res.ok){
                throw new Error('Failed to fetch data');
            }
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.log('Error fetching data', err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/Master-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to submit data');
            }
            setFormData({partName:'', partNumber:'', uom:''});
            fetchData();
        } catch (err) {
            console.log('failed to submit', err.message);
        } finally {
            setLoading(false);
        }
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Master Data');
        XLSX.writeFile(wb, 'Master.xlsx');
    };

    return {
        data,
        currentPage,
        totalPages,
        currentItems,
        search,
        loading,
        formData,
        changeHandler,
        submitHandler,
        exportToExcel,
        handleNextPage,
        handlePreviousPage,
        handleSearchChange
    };
};
