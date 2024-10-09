import { EditBarangMasukHook } from '../../../../hook/barang-masuk/edit-barang-masuk';
import LoadingScreen from '../../loading/loading';
import './edit-barang-masuk.css';

const EditBarangMasuk = ({ item, onUpdate, onClose }) => {
    const {
        formData,
        editLoading,
        handleChange,
        handleSubmit 
    } = EditBarangMasukHook(item, onUpdate, onClose);

    return (
        <div className="edit-container">
            <form onSubmit={handleSubmit}>
                <h2>Edit Incoming Items</h2>
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
                        {editLoading ? <LoadingScreen/> : 'Cancel'}

                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBarangMasuk;
