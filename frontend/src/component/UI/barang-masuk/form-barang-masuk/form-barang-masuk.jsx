import LoadingScreen from '../../loading/loading';
import './form-barang-masuk.css';

const FormBarangMasuk = ({ barangMasuk }) => {
    const { 
        formLoading,
        formBarangMasuk,
        barangMasukHandler, 
        submitBarangMasukHandler
    } = barangMasuk;

    return (
        <div className='form-containers'>
            {formLoading ? (
                <LoadingScreen />
            ):(
                <form className='form-control' method='POST' onSubmit={submitBarangMasukHandler}>
                <div className="form-group">
                    <label htmlFor='tanggal'>Date:</label>
                    <input
                        type='date'
                        id='tanggal'
                        name='tanggal'
                        className='tanggal'
                        onChange={barangMasukHandler}
                        value={formBarangMasuk.tanggal}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='doc_no'>Doc No:</label>
                    <input
                        type='text'
                        id='doc_no'
                        name='doc_no'
                        className='doc_no'
                        onChange={barangMasukHandler}
                        value={formBarangMasuk.doc_no}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='part_number'>Part Number:</label>
                    <input
                        type='text'
                        id='part_number'
                        name='part_number'
                        className='part_number'
                        onChange={barangMasukHandler}
                        value={formBarangMasuk.part_number}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='part_name'>Part Name:</label>
                    <input
                        type='text'
                        id='part_name'
                        name='part_name'
                        className='part_name'
                        onChange={barangMasukHandler}
                        value={formBarangMasuk.part_name}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='uom'>UOM:</label>
                    <input
                        type='text'
                        id='uom'
                        name='uom'
                        className='uom'
                        onChange={barangMasukHandler}
                        value={formBarangMasuk.uom}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='qty'>QTY:</label>
                    <input
                        type='number'
                        id='qty'
                        name='qty'
                        className='qty'
                        onChange={barangMasukHandler}
                        value={formBarangMasuk.qty}
                        required
                    />
                </div>
                <button type='submit' className='btn' disabled={formLoading}>
                    {formLoading ? <LoadingScreen /> : 'Submit'}
                </button>   
            </form>
            )}
        </div>
    );
};

export default FormBarangMasuk;
