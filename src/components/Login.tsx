import React from 'react';
import './Login.css';
import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { googleLogin, emailVerification } from '../config/firebase';
import firebase from '../config/firebase';
import TextField from '@material-ui/core/TextField';
import { createInputFiles } from 'typescript';
import { SettingsRemote } from '@material-ui/icons';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [item, setItem] = useState<File | null>(null);

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
    const inputFile = (files: FileList | null) => {
        const S =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const N = 16;
        const randomChar =
            Array.from(crypto.getRandomValues(new Uint32Array(N)))
                .map((n) => S[n % S.length])
                .join('');
        const fileName = randomChar + '_' + item?.name;
        const uploadItem = firebase
            .storage()
            .ref(`images`)
            .child(fileName)
            .put(item!);
        const file: File = files![0];
        setItem(file);

        uploadItem.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            function () {
                console.log('uploading...')
            },
            function (error) {
                console.log(error.message)
            },
            function () {
                uploadItem.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('File available at', downloadURL);
                    firebase.firestore().collection('images').add({
                        name: 'yo-yan',
                        age: 28,
                        url: downloadURL,
                        createAt: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                });
            }
        )
    }
    return (
        <div className='Main'>
            <div className='Left'>
                <img src="" alt="" />
            </div>
            <input type="file" onChange={(e) => inputFile(e.target.files)} />
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
