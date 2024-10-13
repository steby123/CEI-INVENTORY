import LoadingScreen from '../../loading/loading';
import './formDivision.css';

const FormDivision = ({divisionData}) => {
    const { 
        formDivision,
        loading,
        divisionHandler,
        submitDivisionHandler 
    } = divisionData;

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
                        value={formDivision.divisionCode}
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
                        value={formDivision.divisionName}
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