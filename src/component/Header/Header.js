import React, { useState } from 'react';
import { Dialog, IconButton, Link, Menu, MenuItem, AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import Studentresults from '../Results/Studentresults';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import jwt from 'jsonwebtoken';

export default function Header() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [opendraw, setOpendraw] = useState(false);
    const [profile, setProfile] = useState(null);
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    let userdata = userInfo ? jwt.decode(userInfo) : "";

    let today = new Date();
    let jwt_exp = userInfo ? userdata.exp : ''
    let exp_date = new Date(jwt_exp * 1000);

    const openprofile = (event) => {
        setProfile(event.currentTarget);
    };

    const closeprofile = () => {
        setProfile(null);
    };

    const openDraw = () => {
        setOpendraw(true);
    }

    const closeDraw = () => {
        setOpendraw(false);
    }

    const onlogout = () => {
        dispatch(logout())
    }

    const showresult = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="">
            { userdata && today > exp_date ? dispatch(logout()) : ''}
            {userdata &&
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            className="d-block d-lg-none"
                            onClick={openDraw}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className="d-none d-lg-block">
                            <Link href="/" className="text-white pe-4">Home</Link>
                            <Link className="text-white pe-4">About</Link>
                            <Link className="text-white pe-4" onClick={showresult}>Result</Link>
                        </div>
                        <div className="flex-grow-1" />
                        <Link className="text-white" onClick={openprofile}><AccountCircleIcon /> {userdata.username}</Link>
                        <Menu
                            id="simple-menu"
                            anchorEl={profile}
                            keepMounted
                            open={Boolean(profile)}
                            onClose={closeprofile}
                        >
                            <MenuItem><Link href="/profile">Profile</Link></MenuItem>
                            <MenuItem onClick={onlogout}>Logout</MenuItem>
                        </Menu>
                        <Dialog fullScreen open={open} onClose={handleClose}>
                            <div className="row m-0 py-2">
                                <div className="col-lg-12 text-end">
                                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <Studentresults />
                        </Dialog>
                        <Drawer anchor="left" open={opendraw} onClose={closeDraw}>
                            <div style={{ width: '250px' }} className="py-3">
                                <List component="nav" aria-label="contacts">
                                    <ListItem component="a" href="/">
                                        <ListItemIcon>
                                            <HomeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItem>
                                    <Divider />
                                    <ListItem component="a" href="/profile">
                                        <ListItemIcon>
                                            <AccountCircleIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="My Profile" />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button onClick={showresult}>
                                        <ListItemIcon>
                                            <CheckCircleIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Result" />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button onClick={onlogout}>
                                        <ListItemIcon>
                                            <PowerSettingsNewIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </ListItem>
                                </List>
                            </div>
                        </Drawer>
                    </Toolbar>
                </AppBar>
            }
        </div>
    )
}
