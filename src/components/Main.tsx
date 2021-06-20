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
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Nuuheader from './Nuuheader';
import Message from '../components/Message';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        },
    }),
);

const Main = ({ name }: any) => {
    const [string, setString] = useState<any>('');
    const [tweet, setTweet] = useState<any>();
    const [item, setItem] = useState<File | null>(null);
    const [username, setUsername] = useState<string | null>('');
    const [avater, setAvater] = useState<string | null>('')

    const inputEl = useRef<any>(null);

    const history = useHistory();

    const classes = useStyles();

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
        //readData()
        inputEl.current.focus();
    }, []);

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
            .orderBy('createAt', 'desc')
            .get()
            .then(function (querySnapshot: any) {
                querySnapshot.forEach(function (doc: any) {
                    console.log(doc.id, " => ", doc.data());
                    tempArray.push(doc.data())
                });
                setTweet(tempArray)
            })
    };

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
            <Nuuheader />
            <div className='header'>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span" >
                        <PhotoCamera />
                    </IconButton>
                </label>
                <TextField className='text' type='text' inputRef={inputEl} id="tweet" label="tweet" value={string} onChange={e => setString(e.target.value)} />
                <Button variant="outlined" onClick={handleClick}>送信</Button>
            </div>
            <div className='main'>
                <div className='design'>
                    <Avatar alt="Remy Sharp" src={avater!} />{username}</div>
                <main>
                    {tweet && tweet.map((element: any, index: any) => {
                        return (
                            <ul key={index}>
                                <Message
                                    username={element.name}
                                    avater={element.avater}
                                    string={element.string}
                                    tweet={element.message}
                                    createAt={element.createAt.toDate()} />
                            </ul>
                        );
                    })}
                </main>
                <div className='main'>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    )
};

export default Main;
