import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import firebase from '../config/firebase';
import { userLogout } from '../config/firebase'

const Main = () => {

    const [username, setUsername] = useState<string | null>('');
    const history = useHistory();

    const logout = async () => {
        userLogout()
        history.push('/')
    }

    useEffect(() => {
        //LoginuserNameの表示
        firebase.auth().onAuthStateChanged(function (user) {
            var user = firebase.auth().currentUser;
            console.log(user?.displayName)
            if (user) {
                setUsername(user?.displayName)
            } else {
                // No user is signed in.
            }
        });
    });

    return (
        <div>
            <div className='header'>
                <h1>Nuu.Main</h1>
            </div>
            <div className='main'>
                {username}
                <button onClick={logout}>Logout</button>
            </div>
            <div className='footer'>

            </div>
        </div>
    )

};

export default Main
