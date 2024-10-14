import DonwoaldToExcel from '../../button-excel/donwoald-to-excel';
import { TableSisaStockDetail } from '../../../../hook/sisa-stock/table-sisa-stock-detail';
import './tabel-sisa-stock-detail.css';
import LoadingScreen from '../../loading/loading';

const tabelSisaStockDetail = ({ stockDetails, onClose, loading }) => {

    const {
        formatDate,
        exportToExcel,
        formatPrice
    } = TableSisaStockDetail(stockDetails);

    return(
        <div className="popup-overlay">
            <div className="popups-content">
                <div className="header-container">
                    <h2>Remaining Stock Detail</h2>
                    <button onClick={onClose} className='btn-close'>X</button>
                </div>
                
                {loading ? (
                    <LoadingScreen />
                ): (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Doc No</th>
                                <th>Division Code</th>
                                <th>Division Name</th>
                                <th>Part Number</th>
                                <th>Part Name</th>
                                <th>uom</th>
                                <th>qty</th>
                                <th>transaction</th>
                            </tr>
                        </thead>
                        <tbody>
                        {stockDetails.length === 0 ? (
                            <tr>
                                <td className="no-data" colSpan="7">No Data</td>
                            </tr>
                        ) : (
                            stockDetails.map((item, index) => (
                                <tr key={index}>
                                    <td>{formatDate(item.tanggal)}</td>
                                    <td>{item.doc_no}</td>
                                    <td>{item.division_code}</td>
                                    <td>{item.division_name}</td>
                                    <td>{item.part_number}</td>
                                    <td>{item.part_name}</td>
                                    <td>{item.uom}</td>
                                    <td>{formatPrice(item.barang_qty)}</td>
                                    <td>{item.transaction_type}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                )}
                <DonwoaldToExcel 
                    exportToExcel={exportToExcel}   
                />
            </div>
        </div>
    )
}

export default tabelSisaStockDetail;