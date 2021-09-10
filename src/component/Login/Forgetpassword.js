import React, { useState } from 'react';
import { change_password } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Avatar, Typography, TextField, Grid, Link } from '@material-ui/core';
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
export default function Forgetpassword() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [passerror, setPasserror] = useState("");
    const [disable, setDisable] = useState(true);

    const onchange_pass = () => {
        dispatch(change_password(email, pass));
    }

    const passvalidate = (e) => {
        setPass(e.target.value);
        setPasserror("");
        let password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (e.target.value.length >= 8) {
            if (e.target.value.match(password)) {
            } else {
                setPasserror(
                    "Password must be Numeric,Upper,Lowercase and Special Characters"
                );
            }
        } else {
            setPasserror("Password must be a 8 Character");
        }
    }

    const validate = () => {
        let password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase()) && pass.length >= 8 && pass.match(password)) {
            setDisable(false);
        }
        else {
            setDisable(true);
        }
    }

    const forget_pass = () => {
        const login = document.querySelector('.studentlogin');
        login.classList.toggle('forget_pass');
    }

    const userSignin = useSelector(state => state.userSignin);
    const { change_pass, change_pass_error } = userSignin;

    return (
        <div>
            <div className="student_forget_pass">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Change Password
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyUp={validate}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        label="Enter new password"
                        value={pass}
                        onChange={(e) => passvalidate(e)}
                        onKeyUp={validate}
                    />
                    {passerror && (
                        <Alert
                            className="d-flex align-items-center me-auto"
                            style={{ fontSize: 11, padding: "0 5px" }}
                            severity="error"
                        >
                            {passerror}
                        </Alert>
                    )}
                    {change_pass_error &&
                        <Alert
                            className="d-flex align-items-center me-auto"
                            style={{ fontSize: 12, padding: "0 5px" }}
                            severity="error"
                        >
                            This Email Id is does not exist
                        </Alert>
                    }
                    {
                        change_pass &&
                        <Alert
                            className="d-flex align-items-center me-auto"
                            style={{ fontSize: 12, padding: "0 5px" }}
                            severity="success"
                        >
                            {change_pass.msg} Click <Link onClick={forget_pass}>here</Link> to Signin
                        </Alert>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={disable}
                        onClick={onchange_pass}
                    >
                        Change Password
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link onClick={forget_pass} variant="body2">
                                {"Click here to Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}
