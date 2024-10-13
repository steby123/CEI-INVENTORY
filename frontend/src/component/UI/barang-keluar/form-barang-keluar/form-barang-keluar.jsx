import LoadingScreen from '../../loading/loading';
import './form-barang-keluar.css';

const FormBarangKeluar = ({barangKeluar}) => {
    const {
        formLoading,
        FormBarangKeluar,
        changeHandler,
        submitHandler,
    } = barangKeluar;

    return(
        <div className='form-containers'>
            {formLoading ? (
                <LoadingScreen /> 
            ):(
                <form action='/Barang-keluar' className='form-control' method='POST' onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor='part_number'>Date:</label>
                    <input
                        type='date'
                        id='date'
                        name='tanggal'
                        className='date'
                        onChange={changeHandler}
                        value={FormBarangKeluar.tanggal}
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
                        onChange={changeHandler}
                        value={FormBarangKeluar.doc_no}
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
                        onChange={changeHandler}
                        value={FormBarangKeluar.part_number}
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
                        onChange={changeHandler}
                        value={FormBarangKeluar.part_name}
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
                        onChange={changeHandler}
                        value={FormBarangKeluar.uom}
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
                        onChange={changeHandler}
                        value={FormBarangKeluar.qty}
                        required
                    />
                </div>
                <button type='submit' className='btn' required={formLoading}>
                    {formLoading ? <LoadingScreen /> : 'Submit'}
                </button>   
            </form>
            )}
        </div>
    )
}

export default FormBarangKeluar;