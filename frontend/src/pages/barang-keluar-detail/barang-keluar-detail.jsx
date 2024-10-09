import FormBarangKeluarDetail from '../../component/UI/barang-keluar-detail/form-barang-keluar-detail/form-barang-keluar-detail';
import TableBarangKeluarDetail from '../../component/UI/barang-keluar-detail/table-barang-keluar-detail/table-barang-keluar-detail';
import './barang-keluar-detail.css';
import { BarangKeluarDetailHook } from '../../hook/barang-keluar-detail/barang-keluar-detail';

const BarangKeluarDetail = () => {
    const hookDetail = BarangKeluarDetailHook();

    return(
        <div className="containers">
            <div className="containers-text">
                <TableBarangKeluarDetail hookDetail={hookDetail} />
                <FormBarangKeluarDetail hookDetail={hookDetail} />
            </div>
        </div>
    )
}

export default BarangKeluarDetail