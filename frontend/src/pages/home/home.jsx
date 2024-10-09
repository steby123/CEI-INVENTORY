    import LoadingScreen from '../../component/UI/loading/loading';
import { HomeHook } from '../../hook/home/home';
    import './home.css';

    const Home = () => {
        const {
            loading
        } = HomeHook();

        return(
            <>
                {loading ? (
                    <LoadingScreen />
                ): (
                    <div className="containers">
                        <div className="containers-text">
                            <h1>SISTEM FIFO INVENTORY</h1>
                            <h2>PT. Chengyang Electronic Indonesia</h2>
                        </div>
                    </div>
                )}
            </>
        )
    }

    export default Home;