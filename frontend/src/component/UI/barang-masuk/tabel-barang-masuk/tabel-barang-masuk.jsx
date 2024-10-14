import NewPage from '../../newpage/newpage';
import SearchBar from '../../searchbar/searchbar';
import EditBarangMasuk from '../edit-barang-masuk/edit-barang-masuk';
import DonwoaldToExcel from '../../button-excel/donwoald-to-excel';
import LoadingScreen from '../../loading/loading';
import './tabel-barang-masuk.css';

const TableBarangMasuk = ({barangMasuk}) => {
    const {
        selectedItem,
        currentItems,
        currentPage,
        totalPages,
        search,
        loading,
        handleDelete,
        handleEdit,
        handleUpdate,
        formatDate,
        handleClose,
        exportToExcel,
        formatPrice,
        handlePreviousPage,
        handleNextPage,
        handleSearchChange
    } = barangMasuk;
    
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
                            <th>Date</th>
                            <th>Division Code</th>
                            <th>Division Name</th>
                            <th>Doc No</th>
                            <th>Part Number</th>
                            <th>Part Name</th>
                            <th>UOM</th>
                            <th>QTY</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length === 0 ? (
                            <tr>
                                <td className="no-data" colSpan="10">No Data</td>
                            </tr>
                        ) : (
                            currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1 + (currentPage - 1) * 10}</td>
                                    <td>{formatDate(item.tanggal)}</td>
                                    <td>{item.division_code}</td>
                                    <td>{item.division_name}</td>
                                    <td>{item.doc_no}</td>
                                    <td>{item.part_number}</td>
                                    <td>{item.part_name}</td>
                                    <td>{item.uom}</td>
                                    <td>{formatPrice(item.qty)}</td>
                                    <td className='actions'>
                                        <button className='edit' onClick={() => handleEdit(item)} disabled={loading}>
                                            {loading ? <LoadingScreen/> : <i className="fas fa-edit"></i>}

                                        </button>
                                        <button className='delete' onClick={() => handleDelete(item.id)} disabled={loading}>
                                            {loading ? <LoadingScreen/> : <i className="fas fa-trash-alt"></i>}
                                        </button>
                                    </td>
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
            {selectedItem && (
                <EditBarangMasuk 
                    item={selectedItem} 
                    onUpdate={handleUpdate} 
                    onClose={handleClose} 
                />
            )}
        </div>
    )
}

export default TableBarangMasuk;