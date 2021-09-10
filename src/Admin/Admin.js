import React from 'react';
import Adminlogin from './Adminlogin';
import { useSelector } from 'react-redux';
import AdminHome from './AdminHome';
import './Admin.css'


export default function Admin() {
    const userSignin = useSelector(state => state.userSignin);
    const { admininfo } = userSignin;
    return (
        <div>
            {admininfo ? <AdminHome /> : <Adminlogin />}
        </div>
    )
}
