import FormBarangKeluar from '../../component/UI/barang-keluar/form-barang-keluar/form-barang-keluar';
import TableBarangKeluar from '../../component/UI/barang-keluar/tabel-barang-keluar/tabel-barang-keluar';
import './barang-keluar.css';

const BarangKeluar = () => {
    return(
        <div className="containers">
            <div className="containers-text">
                <FormBarangKeluar />
                <TableBarangKeluar />   
            </div>
        </div>
    )
}

export default BarangKeluar;