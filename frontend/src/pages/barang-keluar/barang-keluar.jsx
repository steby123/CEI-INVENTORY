import FormBarangKeluar from '../../component/UI/barang-keluar/form-barang-keluar/form-barang-keluar';
import TableBarangKeluar from '../../component/UI/barang-keluar/tabel-barang-keluar/tabel-barang-keluar';
import { useBarangKeluar } from '../../hook/barang-keluar/barang-keluar';
import './barang-keluar.css';

const BarangKeluar = () => {
    const barangKeluar = useBarangKeluar();
    return(
        <div className="containers">
            <div className="containers-text">
                <FormBarangKeluar barangKeluar={barangKeluar}/>
                <TableBarangKeluar barangKeluar={barangKeluar}/>   
            </div>
        </div>
    )
}

export default BarangKeluar;