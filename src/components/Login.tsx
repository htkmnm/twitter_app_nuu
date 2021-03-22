import React from 'react'
import { createData } from '../config/firebase'

const Login = () => {

    const handleClick = async () => {
        await createData()
        console.log('createUser')
    }

    return (
        <div>
            Login
            <button onClick={handleClick}>CREATE USER</button>
        </div>
    )
}

export default Login
