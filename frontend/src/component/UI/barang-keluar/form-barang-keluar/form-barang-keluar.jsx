import { FormBarangKeluarHook } from '../../../../hook/barang-keluar/form-barang-keluar';
import LoadingScreen from '../../loading/loading';
import './form-barang-keluar.css';

const FormBarangKeluar = () => {
    const {
        formLoading,
        changeHandler,
        submitHandler
    } = FormBarangKeluarHook();

    return(
        <div className='form-containers'>
            <form action='/Barang-keluar' className='form-control' method='POST' onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor='part_number'>Date:</label>
                    <input
                        type='date'
                        id='date'
                        name='tanggal'
                        className='date'
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='doc_no'>Doc No:</label>
                    <input
                        type='text'
                        id='doc_no'
                        name='docNo'
                        className='doc_no'
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='part_number'>Part Number:</label>
                    <input
                        type='text'
                        id='part_number'
                        name='partNumber'
                        className='part_number'
                        onChange={changeHandler}
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
                        onChange={changeHandler}
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

export default FormBarangKeluar;