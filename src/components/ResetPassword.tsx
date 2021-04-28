import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { resetPassword } from '../config/firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const ResetPassword = () => {

    const [email, setEmail] = useState<string>('');
    const history = useHistory();

    const back = () => {
        history.push('/')
    };

    const sendEmail = async () => {
        await resetPassword(email)
        console.log(email)
    };

    return (
        <div>
            <TextField id="email" label="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
            <Button variant="outlined" onClick={back}>戻る</Button>
            <Button variant="outlined" value={email} onClick={sendEmail}>変更</Button>
        </div>
    );

};

export default ResetPassword;
