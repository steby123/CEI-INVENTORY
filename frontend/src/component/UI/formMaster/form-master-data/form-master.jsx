import { MasterDataHook } from '../../../../hook/master-data/Master-data';
import LoadingScreen from '../../loading/loading';
import './form-master.css';

const Formmaster = () => {
    const { 
        isLoading,
        submitHandler, 
        changeHandler
    } = MasterDataHook();
        
    return (
        <div className='form-containers'>
            <form action='/Master-data' className='form-control' method='POST' onSubmit={submitHandler}>
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
                <button type='submit' className='btn' disabled={isLoading}>
                    {isLoading ? <LoadingScreen /> : 'Submit'}
                </button>   
            </form>
        </div>
    );
};
export default Formmaster;
