import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { sendMessage, db } from '../config/firebase';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main'
import 'firebase/firestore';
import firebase from '../config/firebase';

const Main = ({ name }: any) => {
    const [string, setString] = useState<any>('');
    const [tweet, setTweet] = useState<any>();
    const inputEl = useRef<any>(null);
    const [item, setItem] = useState<File | null>(null);

    const handleClick = async () => {
        sendMessage(name, string)
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
            <main>
                {tweet && tweet.map((element: any, index: any) => {
                    return (
                        <ul key={index}>
                            <li>
                                <div className='namesize'>{element.name}</div> {element.message}
                            </li>
                        </ul>
                    );
                })}
            </main>
        </div>
    )
};

export default Main;
