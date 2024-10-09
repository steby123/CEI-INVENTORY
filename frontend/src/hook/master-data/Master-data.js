import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';

export const MasterDataHook = () => {
    const [formData, setFormData] = useState({
        partNumber: '',
        partName: '',
        uom: ''
    });
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(formData);

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/Master-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            console.log(result.message);

            if (response.ok) {
                setFormData({
                    partNumber: '',
                    partName: '',
                    uom: ''
                });
                fetchData();
            }
        } catch (err) {
            console.log('failed to submit', err.message);
            throw new Error(err.message);
        } finally{
            setIsLoading(false)
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:3000/Master-data');
            const data = await res.json();
            console.log(data);
            setData(data);
            setCurrentPage(1); // Reset to first page on data fetch
        } catch (err) {
            console.log(err.message);
            throw err;
        } finally{
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Master Data');
        XLSX.writeFile(wb, 'Master.xlsx');
    };

    const handleSearchChange = async(e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to first page on search
        setIsLoading(true);
        try{
            await new Promise(resolve => setTimeout(resolve, 1000));    
        }catch(err){
            console.log(err.message)
        }finally{
            setIsLoading(false)
        }
    };

    // Corrected filtering logic
    const filteredData = data.filter(item =>
        item.part_number.toLowerCase().includes(search.toLowerCase()) ||
        item.part_name.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleNextPage = async() => {
        try{
            if (currentPage < totalPages) {
                setIsLoading(true)
                setCurrentPage(currentPage + 1);
                await fetchData();
                
            }
        }catch(err){
            throw new Error(err.message);
        }finally{
            setIsLoading(false)
        }
    };

    const handlePreviousPage = async() => {
        try{
            if (currentPage > 1) {
                setIsLoading(true)
                setCurrentPage(currentPage - 1);
                await fetchData();
            }
        }catch(err){
            throw new Error(err.message)
        }finally{
            setIsLoading(false)
        }
    };

    return {
        formData,
        data,
        currentItems,
        currentPage,
        totalPages,
        search,
        isLoading,
        submitHandler,
        changeHandler,
        exportToExcel,
        handleNextPage,
        handlePreviousPage,
        handleSearchChange, 
    };
};
