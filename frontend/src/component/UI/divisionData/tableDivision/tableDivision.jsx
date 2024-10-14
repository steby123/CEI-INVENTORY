import NewPage from '../../newpage/newpage';
import SearchBar from '../../searchbar/searchbar';
import DonwoaldToExcel from '../../button-excel/donwoald-to-excel';
import './tableDivision.css';
import LoadingScreen from '../../loading/loading';

const TableDivision = ({divisionData}) => {
    const { 
        currentItems,
        currentPage, 
        totalPages, 
        search,
        loading,
        handleNextPage, 
        handlePreviousPage,  
        exportToExcel,
        handleSearchChange
    } = divisionData;

    return(
        <div className="table-container">
            <SearchBar 
                search={search} 
                handleSearchChange={handleSearchChange}  
            />
            {loading ? (
                <LoadingScreen />
            ): (
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Division Code</th>
                            <th>Division Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length === 0 ? (  
                            <tr>
                                <td className="no-data" colSpan="3">No Data</td>
                            </tr>
                        ) : (
                            currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1 + (currentPage - 1) * 10}</td>
                                    <td>{item.division_code}</td>
                                    <td>{item.division_name}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
            <DonwoaldToExcel 
                exportToExcel={exportToExcel}   
            />
            <NewPage 
                currentItems={currentItems} 
                currentPage={currentPage} 
                totalPages={totalPages} 
                handlePreviousPage={handlePreviousPage} 
                handleNextPage={handleNextPage}  
            />
        </div>
    )
}

export default TableDivision;