import React, { useState } from 'react';
import { signin } from '../actions/userActions';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

export default function Signin() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    const login = () => {
        dispatch(signin(name, pass));
    }

    const toggleForm = () => {
        const login = document.querySelector('.login');
        login.classList.toggle('active');
    };


    return (
        <div>
            <div className="user signinBx">
                <div className="imgBx"><img src="images/signin.jpg" alt="" /></div>
                <div className="formBx">
                    <div>
                        <h2>Sign In</h2>
                        <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
                        <Button onClick={login} variant="contained" color="primary">
                            Login
                        </Button>
                        <p className="signup">
                            Don't have an account ?
                                    <a href="javascript:void(0)" onClick={toggleForm}>Sign Up.</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
