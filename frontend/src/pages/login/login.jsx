import { LoginHook } from '../../hook/login/login';
import { Link } from 'react-router-dom';
import './login.css'
import LoadingScreen from '../../component/UI/loading/loading';

const Login = ({setIsAuthenticated}) => {
    const { 
        loading,
        submitHandler, 
        handleChange
    } = LoginHook({setIsAuthenticated});

    return(
        <form action='/login' method='POST' onSubmit={submitHandler}>
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder='username'
                    onChange={handleChange} 
                    required     
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type='password'
                    id="password" 
                    name="password"  
                    placeholder='password'
                    onChange={handleChange} 
                    required   
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? <LoadingScreen /> : 'submit'}
            </button>
        </form>
    )
}

export default Login;