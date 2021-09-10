import React from 'react';
import Signin from './Signin';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import './Studentlogin.css';
import Signup from './Signup';
import Forgetpassword from './Forgetpassword';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(images/studentlogin.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
}));

export default function Studentlogin() {
    const classes = useStyles();
    return (
        <div className="studentlogin">
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Signin />
                    <Signup />
                    <Forgetpassword />
                </Grid>
            </Grid>
        </div>
    )
}
