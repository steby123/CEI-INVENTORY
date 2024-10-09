import ErrorMessage from '../../component/UI/Error-message/error-message';
import LoadingScreen from '../../component/UI/loading/loading';
import { RegisterHook } from '../../hook/register/register';
import './register.css';

const Register = () => {
    const {
        loading,
        errorMessage,
        changeHandler,
        registerHandler
    } = RegisterHook();

    return(
        <form action='/register' method='POST' onSubmit={registerHandler}>
            <ErrorMessage message={errorMessage} />
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder='username'
                    onChange={changeHandler} 
                    required    
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder='password'
                    onChange={changeHandler} 
                    required    
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? <LoadingScreen /> : 'register'}
            </button>
        </form>
    )
}

export default Register;