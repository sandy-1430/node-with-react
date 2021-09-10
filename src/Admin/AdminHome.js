import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Link, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useSelector, useDispatch } from 'react-redux';
import jwt from 'jsonwebtoken';
import { logout } from '../actions/userActions';

export default function AdminHome() {
    const dispatch = useDispatch()
    const [opendraw, setOpendraw] = useState(false);
    const userSignin = useSelector(state => state.userSignin);
    const { admininfo } = userSignin;
    let admindata = admininfo ? jwt.decode(admininfo) : "";

    let today = new Date();
    let jwt_exp = admindata ? admindata.exp : ''
    let exp_date = new Date(jwt_exp * 1000);

    const openDraw = () => {
        setOpendraw(true);
    }

    const closeDraw = () => {
        setOpendraw(false);
    }

    const onlogout = () => {
        dispatch(logout())
    }

    return (
        <div>
            { admindata && today > exp_date ? dispatch(logout()) : ''}
            <header>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" onClick={openDraw} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <div className="flex-grow-1"></div>
                        <Link className="text-white"> <AccountCircle /> {admindata.username}</Link>
                    </Toolbar>

                    <Drawer anchor="left" open={opendraw} onClose={closeDraw}>
                        <div style={{ width: '250px' }} className="py-3">
                            <List component="nav" aria-label="contacts">
                                <ListItem component="a" href="/admin/studentresult">
                                    <ListItemIcon>
                                        <CheckCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Student Result" />
                                </ListItem>
                                <Divider />
                                <ListItem onClick={onlogout}>
                                    <ListItemIcon>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                </AppBar>
            </header>
        </div>
    )
}
