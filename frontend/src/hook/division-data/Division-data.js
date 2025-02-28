import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export const DivisionDataHook = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const filteredData = data.filter(item =>
        item.division_code.toLowerCase().includes(search.toLowerCase()) ||
        item.division_name.toLowerCase().includes(search.toLowerCase())
    );

    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleNextPage = async() => {
        try{
            if (currentPage < totalPages) {
                setLoading(true);
                setCurrentPage(currentPage + 1);
                await fetchData();   
            } else {
                console.log('Fail to go to next page');
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
            } else {
                console.log('Fail to go to previous page');
            }
        }catch(err){
            throw new Error(err.message);
        }finally{
            setLoading(false)
        }
    };

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await fetch('http://localhost:3000/Division-data');
            if (!res.ok) {
                if (res.status === 404) {
                    console.error('Resource not found (404)');
                }
                throw new Error('Failed to fetch data');
            }
            const data = await res.json();
            console.log(data);
            setData(data);
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        } finally{
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [formDivision, setFormDivision] = useState({
        divisionCode: '',
        divisionName: ''
    });

    const divisionHandler = (e) => {
        const { name, value } = e.target;
        setFormDivision({
            ...formDivision,
            [name]: value
        });
    };

    const submitDivisionHandler = async (e) => {
        e.preventDefault();
        console.log(formDivision);
        
        setLoading(true)
        try {
            const response = await fetch('http://localhost:3000/Division-data', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formDivision)
            });
            const result = await response.json();
            console.log(result.message);
            if (response.ok) {
                setFormDivision({ 
                    divisionCode: '', 
                    divisionName: '' 
                });
                fetchData(); 
            }else {
                const error = await response.json();
                setErrorMessage(error.message || 'An error occurred while submitting.');
                console.log(error)
            }
        } catch (err) {
            console.log('failed to submit', err.message);
            setErrorMessage('An error occurred while submitting the form.');
        } finally{
            setLoading(false)
        }
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data Division');
        XLSX.writeFile(wb, 'Data_Division.xlsx');
    };

    return {
        formDivision,
        data,
        currentPage,
        totalPages,
        currentItems,
        search,
        loading,
        errorMessage,
        divisionHandler,
        submitDivisionHandler,
        exportToExcel,
        handleNextPage,
        handlePreviousPage,
        handleSearchChange
    };
};
