import './form-barang-keluar-detail.css';

const FormBarangKeluarDetail = () => {

    return(
        <div className='form-containers'>
            <form className='form-control'>
                <div className="form-group">
                    <label htmlFor='tanggal-masuk'>Incoming Date:</label>
                    <input
                        type='date'
                        id='date'
                        name='tanggal_masuk'
                        className='date'
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='tanggal-keluar'>Outcoming Date:</label>
                    <input
                        type='date'
                        id='date'
                        name='tanggal_keluar'
                        className='date'
                        required
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default FormBarangKeluarDetail;