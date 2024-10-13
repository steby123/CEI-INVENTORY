import FormBarangMasuk from '../../component/UI/barang-masuk/form-barang-masuk/form-barang-masuk';
import TableBarangMasuk from '../../component/UI/barang-masuk/tabel-barang-masuk/tabel-barang-masuk';
import { useBarangMasuk } from '../../hook/barang-masuk/barang-masuk';
import './barang-masuk.css';

const BarangMasuk = () => {
    const barangMasuk = useBarangMasuk();
    return(
        <div className="containers">
            <div className="containers-text">
                <FormBarangMasuk barangMasuk={barangMasuk}/>
                <TableBarangMasuk barangMasuk={barangMasuk}/>
            </div>
        </div>
    )
}

export default BarangMasuk;