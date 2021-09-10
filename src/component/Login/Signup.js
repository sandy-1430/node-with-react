import React, { useState } from 'react';
import { Button, Typography, FormControlLabel, TextField, Grid, Link, Radio, RadioGroup, FormControl, FormLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signup } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Loadingbox from '../Loadingbox';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(1, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Signup() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [confirmpass, setConfirmpass] = useState("");
    const [email, setEmail] = useState("");
    const [emailerr, setEmailerr] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState("");
    const [address, setAddress] = useState("");
    const [fathername, setFathername] = useState("");
    const [mothername, setMothername] = useState("");
    const [passerror, setPasserror] = useState("");
    const [disable, setDisable] = useState(true);

    const validate = (e) => {
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

    const emailvalidate = (e) => {
        setEmail(e.target.value);
        setEmailerr("");
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            setEmailerr("Enter Valid Email Id");
        }
    }

    const signupvalidation = () => {
        if (pass === confirmpass && pass && confirmpass && passerror === "" && name && fathername && mothername && email && phone && gender && course && address) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }

    const onsignuped = () => {
        const login = document.querySelector('.studentlogin');
        login.classList.toggle('active');
    }

    const selectgen = (event) => {
        setGender(event.target.value);
    };

    const onsignup = () => {
        dispatch(signup(name, email, pass, phone, gender, course, address, fathername, mothername));
    }

    const registerDetail = useSelector(state => state.registerDetail);
    const { loading, registerinfo, error } = registerDetail;

    return (
        <div className="student_signup">
            {loading && <Loadingbox />}
            <div className={classes.paper}>
                <Typography className="mb-3" component="h1" variant="h5">
                    <LockOutlinedIcon color="secondary" /> Sign Up
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="Name"
                            name="Name"
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value.replace(/[^A-Za-z]/, ""))}
                            onKeyUp={signupvalidation}
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="fathername"
                            label="Father Name"
                            fullWidth
                            value={fathername}
                            onChange={(e) => setFathername(e.target.value.replace(/[^A-Za-z]/, ""))}
                            onKeyUp={signupvalidation}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="mothername"
                            label="Mother Name"
                            fullWidth
                            value={mothername}
                            onChange={(e) => setMothername(e.target.value.replace(/[^A-Za-z]/, ""))}
                            onKeyUp={signupvalidation}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            label="email"
                            fullWidth
                            value={email}
                            onChange={(e) => emailvalidate(e)}
                            onKeyUp={signupvalidation}
                        />
                        {emailerr && (
                            <Alert
                                className="d-flex align-items-center mt-1"
                                style={{ fontSize: 12, padding: "0 5px" }}
                                severity="error"
                            >
                                {emailerr}
                            </Alert>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="Phone"
                            label="Phone"
                            fullWidth
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/, ""))}
                            onKeyUp={signupvalidation}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup row aria-label="gender" name="gender1" value={gender} onChange={selectgen} onClick={signupvalidation}>
                                <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                                <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="course"
                            name="course"
                            label="Course"
                            fullWidth
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            onKeyUp={signupvalidation}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address"
                            label="Address"
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            onKeyUp={signupvalidation}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="password"
                            label="Password"
                            name="password"
                            fullWidth
                            value={pass}
                            onChange={(e) => validate(e)}
                            onKeyUp={signupvalidation}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="password"
                            id="confirm password"
                            label="Confirm Password"
                            fullWidth
                            value={confirmpass}
                            onChange={(e) => setConfirmpass(e.target.value)}
                            onKeyUp={signupvalidation}
                        />
                    </Grid>
                    {passerror && (
                        <Alert
                            className="d-flex align-items-center"
                            style={{ fontSize: 12, padding: "0 5px" }}
                            severity="error"
                        >
                            {passerror}
                        </Alert>
                    )}
                    {registerinfo && (
                        <Alert
                            className="d-flex align-items-center"
                            style={{ fontSize: 12, padding: "0 5px" }}
                            severity="success"
                        >
                            User Register Successfully Click <Link onClick={onsignuped}>here</Link> to Signin
                        </Alert>
                    )}
                    {error && (
                        <Alert
                            className="d-flex align-items-center"
                            style={{ fontSize: 12, padding: "0 5px" }}
                            severity="error"
                        >
                            This Email Or Phone Number is already exit
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        color="primary"
                        disabled={disable}
                        onClick={onsignup}
                    >
                        Sign Up
                </Button>
                    <Grid container>
                        <Grid item>
                            <Link onClick={onsignuped} variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
