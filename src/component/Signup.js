import React, { useState } from 'react';
import { signup } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

export default function Signup() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [passerror, setPasserror] = useState("");
    const [disable, setDisable] = useState(true);

    const registerDetail = useSelector(state => state.registerDetail);
    const { registerinfo, error } = registerDetail;

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

    const confirmpass = (e) => {
        if (pass === e.target.value) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }

    const onsignup = () => {
        dispatch(signup(name, pass, phone, email));
    }

    const toggleForm = () => {
        const login = document.querySelector('.login');
        login.classList.toggle('active');
    };
    return (
        <div>
            <div className="user signupBx">
                <div className="formBx">
                    <div>
                        <h2>Create an account</h2>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value.replace(/[^A-Za-z]/, ""))} placeholder="Username" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/, ""))} maxLength="10" minLength="10" placeholder="Phone Number" />
                        <input type="password" value={pass} onChange={(e) => validate(e)} placeholder="Create Password" />
                        {passerror && (
                            <p style={{ color: 'red', fontSize: '12px', margin: 0 }}>{passerror}</p>
                        )}
                        <input type="password" onChange={(e) => confirmpass(e)} placeholder="Confirm Password" />
                        {registerinfo && <p style={{ color: 'green', fontSize: '12px', margin: 0 }}>Register Successfully Click Sign in</p>}
                        {error && <p style={{ color: 'red', fontSize: '12px', margin: 0 }}>This Email or Phone is Already Exists</p>}
                        <Button onClick={onsignup} disabled={disable} variant="contained" color="primary">
                            Sign Up
                        </Button>
                        <p className="signup">
                            Already have an account ?
                                    <a href="javascript:void(0)" onClick={toggleForm}>Sign in.</a>
                        </p>
                    </div>
                </div>
                <div className="imgBx"><img src="images/signup.jpg" alt="" /></div>
            </div>
        </div>
    )
}
