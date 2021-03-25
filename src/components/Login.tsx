import React from 'react';
import { useState } from 'react'
import firebase from '../config/firebase';
import { googleLogin } from '../config/firebase';
import TextField from '@material-ui/core/TextField';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('succes createUser')
            })
    };

    const handleGoogle = async () => {
        await googleLogin()
        console.log('googlelogin')
    }

    return (
        <div>
            <TextField id="email" label="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
            <TextField id="password" label="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
            <button onClick={handleClick}>CREATE USER</button>
            <button onClick={handleGoogle}>Google Login</button>
        </div>
    );
};

export default Login;
