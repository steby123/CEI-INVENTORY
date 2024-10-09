import LogOutIcon from '../../assets/logout.png';
import LoadingScreen from '../../component/UI/loading/loading';
import { LogoutHook } from '../../hook/logout/logout';
import './logout.css';

const Logout = () => {
    const {
        handleLogout, 
        cancelHandler,
        Loading
    } = LogoutHook();

    return(
            <div className='container'>
                <div className='dialog'>
                    <p>Do you want exit your account</p>
                    <div className='button-container'>
                    {Loading ? (
                        <LoadingScreen />
                    ): (
                        <>
                            <button 
                                className='logout-button'
                                onClick={handleLogout}>
                                <img 
                                    src={LogOutIcon} 
                                    alt='logout' 
                                />
                            </button>
                            <button 
                                className='cancel-button' 
                                onClick={cancelHandler}>No</button>
                        </>
                    )}
                    </div>
                </div>
            </div>
    )
}

export default Logout;