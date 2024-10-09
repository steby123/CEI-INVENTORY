import LoadingScreen from '../../loading/loading';
import './form-barang-keluar-detail.css';

const FormBarangKeluarDetail = ({ hookDetail }) => {

    console.log(hookDetail);

    const {
        loading,
        tanggalMasuk,
        tanggalKeluar,
        TanggalMasukHandler,
        TanggalKeluarHandler,
        submitTanggalHandler
    } = hookDetail;

    return(
        <div className='form-containers'>
            <form className='form-control' onSubmit={submitTanggalHandler}>
                <div className="form-group">
                    <label htmlFor='tanggal-masuk'>Incoming Date:</label>
                    <input
                        type='date'
                        id='tanggal-masuk'
                        name='tanggal_masuk'
                        className='date'
                        onChange={TanggalMasukHandler}
                        value={tanggalMasuk}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='tanggal-keluar'>Outcoming Date:</label>
                    <input
                        type='date'
                        id='tanggal-keluar'
                        name='tanggal_keluar'
                        className='date'
                        onChange={TanggalKeluarHandler}
                        value={tanggalKeluar}
                        required
                    />
                </div>
                <button type='submit'>
                    {loading ? <LoadingScreen /> : 'Submit'}
                </button>
            </form>
        </div>
    )
}

export default FormBarangKeluarDetail;