import './error-message.css';

const ErrorMessage = ({ errorMessage }) => {
    return (
        <div className="error-message">
            {typeof errorMessage === 'string' ? errorMessage : 'An error occured'}
        </div>
    );
};

export default ErrorMessage;
