import LoadingScreen from "../../loading/loading";
import SearchBar from "../../searchbar/searchbar";
import NewPage from "../../newpage/newpage";
import DownloadToExcel from '../../button-excel/donwoald-to-excel';
import './table-barang-keluar-detail.css';

const TableBarangKeluarDetail = ({ hookDetail }) => {
    const {
        totalPages,
        currentItem,
        currentPage,
        loading,
        search,
        handleSearchChange,
        exportToExcel,
        formatDate,
        formatPrice,
        handleNextPage,
        handlePreviousPage,
        navigateHandler,
    } = hookDetail;

    console.log(currentItem);
    console.log('TableBarangKeluarDetail Reload');

    return (
        <div className="table-container">
            <div className="header-container">
                <button className='back-remaining' onClick={navigateHandler} disabled={loading}>
                    {loading ? <LoadingScreen /> : 'Back'}
                </button>
                <SearchBar 
                    search={search}
                    handleSearchChange={handleSearchChange}
                />
            </div>
            {loading ? (
                <LoadingScreen />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Incoming Date</th>
                            <th>Remaining Incoming QTY</th>
                            <th>Outcoming Date</th>
                            <th>Part Number</th>
                            <th>Part Name</th>
                            <th>UOM</th>
                            <th>Outcoming QTY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItem.length === 0 ? (
                            <tr>
                                <td className="no-data" colSpan="8">Tidak ada data</td>
                            </tr>
                        ) : (
                            currentItem.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{formatDate(item.IncomingDate)}</td>
                                    <td>{formatPrice(item.IncomingQty)}</td>
                                    <td>{formatDate(item.OutgoingDate)}</td>
                                    <td>{item.PartNumber}</td>
                                    <td>{item.PartName}</td>
                                    <td>{item.UOM}</td>
                                    <td>{formatPrice(item.OutgoingQty)}</td>
                                </tr>
                            )) 
                        )} 
                        
                    </tbody>
                </table>
            )}
            <DownloadToExcel 
                exportToExcel={exportToExcel}
            />
            <NewPage 
                currentItems={currentItem} 
                currentPage={currentPage} 
                totalPages={totalPages} 
                handlePreviousPage={handlePreviousPage} 
                handleNextPage={handleNextPage} 
            />
        </div>
    );
}

export default TableBarangKeluarDetail;
