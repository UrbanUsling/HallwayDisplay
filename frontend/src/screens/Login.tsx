import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Home from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-Home2.svg";
import CustomInput from "../components/CustomInput.tsx";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (username === adminUsername && password === adminPassword) {
            // Assuming successful login
            console.log('Login successful');
            navigate('/login-confirmation'); // Navigate to the admin home page or dashboard
        } else {
            // Handle login failure
            setErrorMessage('Invalid username or password.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <CustomInput
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <CustomInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                <Link className='header-icon login-home' to="/"><img src={Home} alt='Home'/></Link>
            </form>

            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default Login;
