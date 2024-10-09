import FormBarangMasuk from '../../component/UI/barang-masuk/form-barang-masuk/form-barang-masuk';
import TableBarangMasuk from '../../component/UI/barang-masuk/tabel-barang-masuk/tabel-barang-masuk';
import './barang-masuk.css';

const BarangMasuk = () => {
    return(
        <div className="containers">
            <div className="containers-text">
                <FormBarangMasuk />
                <TableBarangMasuk />
            </div>
        </div>
    )
}

export default BarangMasuk;