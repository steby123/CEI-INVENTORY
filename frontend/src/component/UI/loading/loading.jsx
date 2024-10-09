import './loading.css';

const LoadingScreen = () => {
    return(
        <div className="loading-screen">
            <div className='circular-overlay'>
                <div className="spinner"></div>
            </div>
        </div>
    )   
}

export default LoadingScreen;