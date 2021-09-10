import React, { useState } from 'react';
import { signin } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Avatar, Typography, Checkbox, FormControlLabel, TextField, Grid, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInSide() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [disable, setDisable] = useState(true);

    const siginvalidate = () => {
        if (email && pass) {
            setDisable(false);
        }
        else {
            setDisable(true)
        }
    }

    const login = () => {
        dispatch(signin(email, pass));
    }

    const onsignuped = () => {
        const login = document.querySelector('.studentlogin');
        login.classList.toggle('active');
    }

    const forget_pass = () => {
        const login = document.querySelector('.studentlogin');
        login.classList.toggle('forget_pass');
    }

    const userSignin = useSelector(state => state.userSignin);
    const { error } = userSignin;

    return (
        <div className="student_signin">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyUp={siginvalidate}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    onKeyUp={siginvalidate}
                />
                <FormControlLabel className="me-auto"
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                {error &&
                    <Alert
                        className="d-flex align-items-center me-auto"
                        style={{ fontSize: 12, padding: "0 5px" }}
                        severity="error"
                    >
                        This Email Or Password is Incorrect
                    </Alert>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={disable}
                    onClick={login}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link onClick={forget_pass} variant="body2">
                            Forgot password?
                                </Link>
                    </Grid>
                    <Grid item>
                        <Link onClick={onsignuped} variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>

            </div>
        </div>
    );
}