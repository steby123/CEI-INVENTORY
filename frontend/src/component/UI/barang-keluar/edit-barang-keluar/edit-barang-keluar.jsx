import { EditBarangKeluarHook } from '../../../../hook/barang-keluar/edit-barang-keluar';
import LoadingScreen from '../../loading/loading';
import './edit-barang-keluar.css';

const EditBarangKeluar = ({ item, onUpdate, onClose }) => {
    const {
        formData, 
        handleChange,
        handleSubmit,
        editLoading
    } = EditBarangKeluarHook(item, onUpdate, onClose);

    return (
        <div className="edit-container">
            <form onSubmit={handleSubmit}>
                <h2>Edit Outcoming Items</h2>
                {Object.keys(formData).map((key) => (
                    <div className="form-group" key={key}>
                        <label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                        <input
                            type={key === 'tanggal' ? 'date' : 'text'}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}
                <div className='button-container'>
                    <button type="submit" disabled={editLoading}>
                        {editLoading ? <LoadingScreen /> : 'Save'}
                    </button>
                    <button type='button' onClick={onClose} className='close-button' disabled={editLoading}>
                        {editLoading ? <LoadingScreen /> : 'Cancel'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBarangKeluar;
