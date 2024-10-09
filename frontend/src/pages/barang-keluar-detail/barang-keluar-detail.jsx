import FormBarangKeluarDetail from '../../component/UI/barang-keluar-detail/form-barang-keluar-detail/form-barang-keluar-detail';
import TableBarangKeluarDetail from '../../component/UI/barang-keluar-detail/table-barang-keluar-detail/table-barang-keluar-detail';
import './barang-keluar-detail.css';

const BarangKeluarDetail = () => {
    return(
        <div className="containers">
            <div className="containers-text">
                <TableBarangKeluarDetail />
                <FormBarangKeluarDetail />
            </div>
        </div>
    )
}

export default BarangKeluarDetail