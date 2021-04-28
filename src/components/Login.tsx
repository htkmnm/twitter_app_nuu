import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import './Login.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { googleLogin, emailVerification } from '../config/firebase';
import firebase from '../config/firebase';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const Login = () => {

    function Copyright() {

        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">Nuu official</Link>{' '}
                {new Date().getFullYear()}{'.'}
            </Typography>
        );
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            height: '100vh',
        },
        image: {
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        paper: {
            margin: theme.spacing(8, 4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const classes = useStyles();
    const history = useHistory();

    const handleGoogle = async () => {
        await googleLogin()
        await emailVerification()
        console.log('googlelogin')
        history.push('/Main')
    };

    //email,password Signin機能
    const clickButton = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('sign in')
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
                } else {
                    console.log(error)
                }
            });
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Login</Typography>

                    <form className={classes.form} noValidate>
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
                        />
                        <TextField
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            onClick={clickButton}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>Login</Button>

                        <Button
                            onClick={handleGoogle}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>google Login</Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="/ResetPassword" variant="body2">Forgot password?</Link>
                            </Grid>
                            <Grid item>
                                <Link href="/Create" variant="body2">{"Create New Acount"}</Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid >
    );
};

export default Login;