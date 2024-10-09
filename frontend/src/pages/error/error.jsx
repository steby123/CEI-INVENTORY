import { errorHook } from '../../hook/error/error';
import { Link } from 'react-router-dom';
import './error.css';
import LoadingScreen from '../../component/UI/loading/loading';

const NotFound = () => {
    const { 
        error, 
        message,
        loading 
    } = errorHook();

    return (
        <>
            {loading ? (
                <LoadingScreen />
                ) : (
                <div className="error-container">
                    {error && <div className="error">Error: {error}</div>}
                    {message ? (
                        <div>{JSON.stringify(message)}</div> 
                    ) : (
                        <div>Loading...</div>
                    )}
                    <Link to="/">Go back to Home</Link>
                </div>
            )}
        </>
    );
};

export default NotFound;
