import EditBarangKeluar from '../edit-barang-keluar/edit-barang-keluar';
import SearchBar from '../../searchbar/searchbar';
import NewPage from '../../newpage/newpage';
import DonwoaldToExcel from '../../button-excel/donwoald-to-excel';
import LoadingScreen from '../../loading/loading';
import './tabel-barang-keluar.css';

const TableBarangKeluar = ({barangKeluar}) => {
    const {
        selectedItem, 
        currentItems,
        search,
        currentPage,
        totalPages,
        loading,
        exportToExcel,
        handlePreviousPage,
        handleNextPage,
        handleDelete, 
        handleEdit, 
        handleUpdate, 
        formatDate, 
        handleClose,
        formatPrice,
        handleSearchChange,
        navigateHandler
    } = barangKeluar;

    return(
        <div className="table-container">
            <div className="header-container">
                <button className='remaining-detail' onClick={navigateHandler} required={loading}>
                    {loading ? <LoadingScreen /> : 'Detail'}
                </button>
                <SearchBar 
                    search={search} 
                    handleSearchChange={handleSearchChange} 
                />
            </div>
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
                                    <td>{formatPrice(item.barang_keluar_qty)}</td>
                                    <td className='actions'>
                                        <button className='edit' onClick={() => handleEdit(item)} disabled={loading}>
                                            {loading ? <LoadingScreen/> : <i className="fas fa-edit"></i>}
                                        </button>
                                        <button className='delete' onClick={() => handleDelete(item.id)}>
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
                <EditBarangKeluar 
                    item={selectedItem} 
                    onUpdate={handleUpdate} 
                    onClose={handleClose}/>
            )}   
        </div>
    )
}

export default TableBarangKeluar;