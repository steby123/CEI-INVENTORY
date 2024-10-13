import NewPage from '../../newpage/newpage';
import SearchBar from '../../searchbar/searchbar';
import DonwoaldToExcel from '../../button-excel/donwoald-to-excel';
import './table-master-data.css';
import LoadingScreen from '../../loading/loading';

const TableMasterData = ({masterDataHook}) => { 
    const { 
        currentItems, 
        currentPage, 
        totalPages,
        search,
        isLoading,
        exportToExcel, 
        handleNextPage, 
        handlePreviousPage,  
        handleSearchChange,
    } = masterDataHook;

    return (
        <div className="table-container">
            <SearchBar 
                search={search} 
                handleSearchChange={handleSearchChange}  
            />
            {isLoading ? (
                <LoadingScreen />
            ): (
                <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Part Number</th>
                        <th>Part Name</th>
                        <th>UOM</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length === 0 ? (
                        <tr>
                            <td className="no-data" colSpan="4">Tidak ada data</td>
                        </tr>
                    ) : (
                        currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1 + (currentPage - 1) * 10}</td>
                                <td>{item.part_number}</td>
                                <td>{item.part_name}</td>
                                <td>{item.uom}</td>
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
    );
};

export default TableMasterData;
