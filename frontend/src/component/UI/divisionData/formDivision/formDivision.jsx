import { DivisionData } from '../../../../hook/division-data/Division-data';
import LoadingScreen from '../../loading/loading';
import './formDivision.css';

const FormDivision = () => {
    const { 
        loading,
        divisionHandler,
        submitDivisionHandler 
    } = DivisionData();

    return(
        <div className='form-containers'>
            <form action='/Division-data' className='form-control' method='POST' onSubmit={submitDivisionHandler}>
                <div className="form-group">
                    <label htmlFor='division_code'>Division Code:</label>
                    <input
                        type='text'
                        id='division_code'
                        name='divisionCode'
                        className='division_code'
                        onChange={divisionHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='division_name'>Division Name:</label>
                    <input
                        type='text'
                        id='division_name'
                        name='divisionName'
                        className='division_name'
                        onChange={divisionHandler}
                        required
                    />
                </div>
                <button type='submit' className='btn' disabled={loading}>
                    {loading ? <LoadingScreen /> : 'Submit'}
                </button>   
            </form>
        </div>
    )
}

export default FormDivision;