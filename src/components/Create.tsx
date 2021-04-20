import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../config/firebase';
import { emailVerification } from '../config/firebase';
import TextField from '@material-ui/core/TextField';

function Create() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory();

    const handleClick = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                emailVerification()
                console.log('succes createUser')
                history.push('/')
            })
    };

    return (
        <div>
            <TextField id="email" label="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
            <TextField id="password" label="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
            <button onClick={handleClick}>CREATE USER</button>
        </div>
    )
};

export default Create;
