import './donwoald-to-excel.css';

const DonwoaldToExcel = ({exportToExcel}) => {
    return(
        <button 
            className='download-excel-button' 
            onClick={exportToExcel}>
                <i class="fas fa-file-excel"></i> Excel
        </button>
    )
}

export default DonwoaldToExcel;