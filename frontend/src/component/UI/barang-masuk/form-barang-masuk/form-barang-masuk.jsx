import { BarangMasukHook } from '../../../../hook/barang-masuk/barang-masuk';
import LoadingScreen from '../../loading/loading';
import './form-barang-masuk.css';

const FormBarangMasuk = () => {
    const { 
        formLoading,
        barangMasukHandler, 
        submitBarangMasukHandler
    } = BarangMasukHook();

    return(
        <div className='form-containers'>
            <form action='/Barang-masuk' className='form-control' method='POST' onSubmit={submitBarangMasukHandler}>
                <div className="form-group">
                    <label htmlFor='part_number'>Date:</label>
                    <input
                        type='date'
                        id='tanggal'
                        name='tanggal'
                        className='tanggal'
                        onChange={barangMasukHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='part_name'>Doc No:</label>
                    <input
                        type='text'
                        id='doc_no'
                        name='docNo'
                        className='doc_no'
                        onChange={barangMasukHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='part_name'>Part Number:</label>
                    <input
                        type='text'
                        id='part_number'
                        name='partNumber'
                        className='part_number'
                        onChange={barangMasukHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='part_name'>Part Name:</label>
                    <input
                        type='text'
                        id='part_name'
                        name='partName'
                        className='part_name'
                        onChange={barangMasukHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='part_name'>UOM:</label>
                    <input
                        type='text'
                        id='uom'
                        name='uom'
                        className='uom'
                        onChange={barangMasukHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='part_name'>QTY:</label>
                    <input
                        type='number'
                        id='qty'
                        name='qty'
                        className='qty'
                        onChange={barangMasukHandler}
                        required
                    />
                </div>
                <button type='submit' className='btn' required={formLoading}>
                    {formLoading ? <LoadingScreen /> : 'Submit'}
                </button>   
            </form>
        </div>
    )
}

export default FormBarangMasuk;