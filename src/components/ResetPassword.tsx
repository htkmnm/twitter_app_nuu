import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { resetPassword } from '../config/firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const ResetPassword = () => {

    function Copyright() {

        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">Nuu official</Link>{' '}
                {new Date().getFullYear()}{'.'}
            </Typography>
        );
    }

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
            <TextField
                value={email}
                onChange={e => setEmail(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            /><br />
            <Button variant="outlined" onClick={back}>Back</Button>
            <Button variant="outlined" value={email} onClick={sendEmail}>Reset Password</Button>
            <Copyright />
        </div>
    );

};

export default ResetPassword;
