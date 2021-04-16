import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../config/firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const history = useHistory();

    const back = () => {
        history.push('/')
    };


    const resetPassword = () => {
        const auth = firebase.auth();
        const emailAddress = "user@example.com";

        auth.sendPasswordResetEmail(emailAddress)
            .then(function () {
                console.log("email sent")
                // Email sent.
            })
            .catch(function (error) {
                // An error happened.
                var errorCode = error.code;
                console.log(error.code)
            });
    };

    return (
        <div>
            <TextField id="email" label="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
            <Button variant="outlined" onClick={back}>戻る</Button>
            <Button variant="outlined" value={email} onClick={resetPassword}>変更</Button>
        </div>
    );
};

export default ResetPassword;
