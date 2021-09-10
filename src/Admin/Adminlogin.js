import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { admin_signin } from '../actions/userActions';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f3f3f3'
    },
    cst_cont: {
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '0px 0px 3px 3px rgb(212 212 212 / 50%)',
        padding: '20px'
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default function Adminlogin() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const onlogin = () => {
        dispatch(admin_signin(email, pass));
    }

    return (
        <div className={classes.paper}>
            <Container className={classes.cst_cont} component="main" maxWidth="xs">
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography className="text-center" component="h1" variant="h5">
                    Sign in
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="mt-4"
                    onClick={onlogin}
                >
                    Sign In
            </Button>
            </Container>
        </div>
    );
}