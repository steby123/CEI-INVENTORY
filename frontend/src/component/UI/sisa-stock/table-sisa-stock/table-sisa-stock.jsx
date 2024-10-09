import NewPage from '../../newpage/newpage';
import SearchBar from '../../searchbar/searchbar';
import DonwoaldToExcel from '../../button-excel/donwoald-to-excel';
import { TableSisaStockHook } from '../../../../hook/sisa-stock/table-sisa-stock';
import './table-sisa-stock.css';
import LoadingScreen from '../../loading/loading';

const TableSisaStock = () => {
    const {
        currentItems,
        currentPage,
        totalPages,
        search,
        loading,
        exportToExcel,
        formatPrice,
        handleNextPage,
        handlePreviousPage,
        handleSearchChange
    } = TableSisaStockHook();

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
                            <th>Part Number</th>
                            <th>Part Name</th>
                            <th>UOM</th>
                            <th>Sisa Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length === 0 ? (
                            <tr>
                                <td className="no-data" colSpan="6">Tidak ada data</td>
                            </tr>
                        ) : (
                            currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.part_number}</td>
                                <td>{item.part_name}</td>
                                <td>{item.uom}</td>
                                <td>{formatPrice(item.sisa_stock_barang)}</td>
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

export default TableSisaStock;