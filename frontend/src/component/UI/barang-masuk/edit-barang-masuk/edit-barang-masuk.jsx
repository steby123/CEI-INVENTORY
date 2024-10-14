import { EditBarangMasukHook } from '../../../../hook/barang-masuk/edit-barang-masuk';
import ErrorMessage from '../../Error-message/error-message';
import LoadingScreen from '../../loading/loading';
import './edit-barang-masuk.css';

const EditBarangMasuk = ({ item, onUpdate, onClose }) => {
    const {
        formData,
        editLoading,
        errorMessage,
        handleChange,
        handleSubmit 
    } = EditBarangMasukHook(item, onUpdate, onClose);
    
    return (
        <div className="edit-container">
            <form onSubmit={handleSubmit}>
                {errorMessage && (
                    <ErrorMessage 
                        errorMessage={errorMessage}
                    />
                )}
                <h2>Edit Incoming Items</h2>
                    <div className="form-group">
                        <label htmlFor='tanggal'>Date:</label>
                        <input
                            type='date'
                            id='tanggal'
                            name='tanggal'
                            className='tanggal'
                            onChange={handleChange}
                            value={formData.tanggal}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor='divisionCode'>Division Code:</label>
                        <input
                            type='text'
                            id='divisionCode'
                            name='divisionCode'
                            className='divisionCode'
                            onChange={handleChange}
                            value={formData.divisionCode}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor='divisionName'>Division Name:</label>
                        <input
                            type='text'
                            id='divisionName'
                            name='divisionName'
                            className='divisionName'
                            onChange={handleChange}
                            value={formData.divisionName}
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
                            onChange={handleChange}
                            value={formData.doc_no}
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
                            onChange={handleChange}
                            value={formData.part_number}
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
                            onChange={handleChange}
                            value={formData.part_name}
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
                            onChange={handleChange}
                            value={formData.uom}
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
                            onChange={handleChange}
                            value={formData.qty}
                            required
                        />
                    </div>
                <div className='button-container'>
                    <button type="submit" disabled={editLoading}>
                        {editLoading ? <LoadingScreen /> : 'Save'}
                    </button>
                    <button type='button' onClick={onClose} className='close-button' disabled={editLoading}>
                        {editLoading ? <LoadingScreen/> : 'Cancel'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBarangMasuk;
