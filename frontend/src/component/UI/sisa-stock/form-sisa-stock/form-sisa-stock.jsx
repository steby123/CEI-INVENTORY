import { FormSisaStockHook } from '../../../../hook/sisa-stock/form-sisa-stock';
import ErrorMessage from '../../Error-message/error-message';
import LoadingScreen from '../../loading/loading';
import TabelSisaStockDetail from '../tabel-sisa-stock-detail/tabel-sisa-stock-detail'; 
import './form-sisa-stock.css';

const FormSisaStock = () => {
    const { 
        showPopUp,
        stockDetails,
        loading,
        errorMessage,
        handleSubmit,
        changeHandler,
        closePopUpHandler
    } = FormSisaStockHook();
    
    return (
        <div className='form-containers'>
            <form className='form-control' onSubmit={handleSubmit}>
                {errorMessage && (
                    <ErrorMessage 
                        errorMessage={errorMessage}
                    />
                )}
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
                <button type='submit' className='btn' required={loading}>
                    {loading ? <LoadingScreen/> : 'Submit'}
                </button>   
            </form>
            {showPopUp && (
                <TabelSisaStockDetail 
                    stockDetails={stockDetails} 
                    onClose={closePopUpHandler} 
                    loading={loading}
                />
            )}
        </div>
    );
}

export default FormSisaStock;
