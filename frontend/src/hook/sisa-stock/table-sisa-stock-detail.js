import * as XLSX from 'xlsx';

export const TableSisaStockDetail = (stockDetails) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options).replace(/\s/g, '-'); 
    };

    const exportToExcel = () => {
        // Prepare data for the Excel file
        const ws = XLSX.utils.json_to_sheet(stockDetails);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data Sisa Stock Detail');

        // Export the workbook to a file
        XLSX.writeFile(wb, 'Data_Sisa_Stock_Detail.xlsx');
    };

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0
        }).format(amount);
    };

    return{
        formatDate,
        exportToExcel,
        formatPrice
    }
}