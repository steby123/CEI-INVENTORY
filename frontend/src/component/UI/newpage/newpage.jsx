const NewPage = ({handlePreviousPage, currentPage, totalPages, handleNextPage}) => {
    return (
        <div className="pagination-controls">
            <button 
                onClick={handlePreviousPage} 
                disabled={currentPage === 1}>
                <i className="fas fa-angle-left"></i>
            </button>
            <span>{currentPage} of {totalPages}</span>
            <button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}>
                <i className="fas fa-angle-right"></i>
            </button>
        </div>
    )
}

export default NewPage;