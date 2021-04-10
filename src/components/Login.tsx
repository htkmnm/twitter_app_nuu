import React from 'react';
import './Login.css';
import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { googleLogin, emailVerification } from '../config/firebase';
import firebase from '../config/firebase';
import TextField from '@material-ui/core/TextField';
import TwitterIcon from '@material-ui/icons/Twitter';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: theme.palette.text.primary,
        },
    }),
);

const Login = () => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleGoogle = async () => {
        await googleLogin()
        await emailVerification()
        console.log('googlelogin')
        history.push('/Main')
    }

    const clickButton = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push('/Main')
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                // ...
                if (errorCode === 'auth/user-not-found') {
                    alert('指定されたユーザーは存在しません。')
                } else if (errorCode === 'auth/wrong-password') {
                    alert('パスワードの入力に誤りがあります。')
                } else if (errorCode === 'auth/invalid-email') {
                    alert('入力欄が空白です。')
                } else if (errorCode === 'auth/user-disabled') {
                    alert('このユーザーは無効です。')
                }
            });
    }

    return (
        <div className='Main'>
            <div className='Left'>
                <img src="" alt="" />
            </div>
            <div className='Right'>
                <TextField id="email" label="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
                <TextField id="password" label="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
                <button onClick={handleGoogle}>Google Login</button>
                <button onClick={clickButton}>Login</button>
                <Link to='/ResetPassword'>パスワードをお忘れの方</Link>
                <Link to='/Create'>アカウント作成</Link>
            </div>
        </div>


    );
};
export default Login;
