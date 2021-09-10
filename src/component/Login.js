import React from 'react';
import Signin from './Signin';
import Signup from './Signup';

export default function Login() {
    return (
        <div>
            <section>
                <div className="login">
                    <Signin />
                    <Signup />
                </div>
            </section>
        </div>
    )
}
