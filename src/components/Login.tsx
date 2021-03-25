import React from 'react';
import { createData, googleLogin } from '../config/firebase';

const Login = () => {

    const handleClick = async () => {
        await createData()
        console.log('createUser')
    };

    const handleGoogle = async () => {
        await googleLogin()
        console.log('googlelogin')
    }

    return (
        <div>
            Login
            <button onClick={handleClick}>CREATE USER</button>
            <button onClick={handleGoogle}>Google Login</button>
        </div>
    );
};

export default Login;
