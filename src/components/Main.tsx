import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { sendMessage, db } from '../config/firebase';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main'
import 'firebase/firestore';
import firebase from '../config/firebase';
import { useHistory } from 'react-router-dom'
import { userLogout } from '../config/firebase';
import { Avatar } from '@material-ui/core';

const Main = ({ message }: any) => {
    const [string, setString] = useState<any>('');
    const [tweet, setTweet] = useState<any>();
    const [item, setItem] = useState<File | null>(null);
    const [username, setUsername] = useState<string | null>('');
    const [avater, setAvater] = useState<string | null>('')

    const inputEl = useRef<any>(null);

    const history = useHistory();

    const logout = async () => {
        userLogout()
        history.push('/')
    };

    useEffect(() => {
        //LoginuserNameの表示
        firebase.auth().onAuthStateChanged(function (user) {
            var user = firebase.auth().currentUser;
            console.log(user?.displayName)
            console.log(user?.photoURL)
            if (user) {
                setUsername(user?.displayName)
                setAvater(user?.photoURL)
            } else {
                // No user is signed in.
            }
        });
    });

    const handleClick = async () => {
        sendMessage(username!, string!, avater!)
        readData()
    };

    useEffect(() => {
        readData()
        inputEl.current.focus();
    }, []);

    const readData = async () => {
        const tempArray: any = []
        await db
            .collection('messages')
            .orderBy('createAt', 'asc')
            .get()
            .then(function (querySnapshot: any) {
                querySnapshot.forEach(function (doc: any) {
                    console.log(doc.id, " => ", doc.data());
                    tempArray.push(doc.data())
                });
                setTweet(tempArray)
            })
    };
    console.log(tweet)

    //画像、動画　アップロード機能
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
        <div>
            <header>
                <TextField className='text' type='text' inputRef={inputEl} id="tweet" label="tweet" value={string} onChange={e => setString(e.target.value)} />
                <Button variant="outlined" onClick={handleClick}>送信</Button>
                <input type="file" onChange={(e) => inputFile(e.target.files)} />
            </header>
            <div>
                {tweet && tweet.map((element: any, index: any) => {
                    return (
                        <ul key={index}>
                            <li>
                                <div>
                                    {element.createAt.toDate().getFullYear().toString()}/
                                    {(element.createAt.toDate().getMonth() + 1).toString()}/
                                    {element.createAt.toDate().getDate().toString()}/
                                    {element.createAt.toDate().getHours().toString()}:
                                    {element.createAt.toDate().getMinutes().toString()}:
                                    {element.createAt.toDate().getSeconds().toString()}
                                </div>
                                <div>{element.name}</div>
                                <div>{element.message}</div>
                            </li>
                        </ul>
                    );
                })}
            </div>
            <div className='header'>
            </div>
            <div className='main'>
                <Avatar alt="Remy Sharp" src={avater!} />
                {username}
                <button onClick={logout}>Logout</button>
            </div>
            <div className='footer'>

            </div>
        </div>
    )
};

export default Main;
