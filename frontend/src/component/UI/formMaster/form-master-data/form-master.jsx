import LoadingScreen from '../../loading/loading';
import './form-master.css';

const Formmaster = ({masterDataHook}) => {
    const { 
        isLoading,
        submitHandler, 
        changeHandler,
        formData
    } = masterDataHook;
        
    return (
        <div className='form-containers'>
            {isLoading ? (
                <LoadingScreen />
            ): (
                <form action='/Master-data' className='form-control' method='POST' onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor='part_number'>Part Number:</label>
                    <input
                        type='text'
                        id='part_number'
                        name='partNumber'
                        className='part_number'
                        onChange={changeHandler}
                        value={formData.partNumber}
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
                        value={formData.partName}
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
                        value={formData.uom}
                        required
                    />
                </div>
                <button type='submit' className='btn' disabled={isLoading}>
                    {isLoading ? <LoadingScreen /> : 'Submit'}
                </button>   
            </form>
            )}
        </div>
    );
};
export default Formmaster;
