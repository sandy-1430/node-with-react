import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { profileupdate } from '../../actions/userActions';
import { Button, Link } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import './Studentprofile.css';
import jwt from 'jsonwebtoken';
import { useHistory } from "react-router-dom";
import Loadingbox from '../Loadingbox';

export default function Userprofile() {
    let history = useHistory();
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading } = userSignin;
    let userdata = userInfo ? jwt.decode(userInfo) : "";

    const [name, setName] = useState(userdata ? userdata.username : "");
    const id = userdata ? userdata._id : "";
    const [email, setEmail] = useState(userdata ? userdata.email : "");
    const [phone, setPhone] = useState(userdata ? userdata.phone : "");
    const [gender, setGender] = useState(userdata ? userdata.gender : "");
    const [course, setCourse] = useState(userdata ? userdata.course : "");
    const [address, setAddress] = useState(userdata ? userdata.address : "");
    const [fathername, setFathername] = useState(userdata ? userdata.fathername : "");
    const [mothername, setMothername] = useState(userdata ? userdata.mothername : "");
    const [disable, setDisable] = useState(true);
    const [updatebtn, setUpdatebtn] = useState(userdata ? true : false);


    const editable = () => {
        if (disable) {
            setDisable(false);
        }
        else {
            setDisable(true);
        }
    }

    const updateprof = () => {
        dispatch(profileupdate(id, name, email, phone, gender, course, address, fathername, mothername));
        setDisable(true);
        setUpdatebtn(true);
    }

    const selectgen = (e) => {
        setGender(e.target.value);
        if (e.target.value !== userdata.gender) {
            setUpdatebtn(false);
        }
        else {
            setUpdatebtn(true);
        }
    }

    const validate = () => {
        if (name && fathername && mothername && email && phone && gender && course && address) {
            if (name !== userdata.username || email !== userdata.email || phone !== userdata.phone
                || course !== userdata.course || address !== userdata.address ||
                fathername !== userdata.fathername || mothername !== userdata.mothername) {
                setUpdatebtn(false);
            }
            else {
                setUpdatebtn(true);
            }
        }
        else {
            setUpdatebtn(true);
        }
    }


    return (
        <div>
            {userInfo ? '' : history.push('/')}
            {loading && <Loadingbox />}
            <div className="user-profile mt-5 py-4">
                {userdata &&
                    <div className="container cst_container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-10">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-md-6 col-6">
                                                <h4>My Account</h4>
                                            </div>
                                            <div className="col-md-6 col-6 text-end">
                                                <Link onClick={editable} className="me-3"><EditIcon /></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div class="form-group mb-3">
                                                    <label for="Name">Name</label>
                                                    <input type="text" class="form-control" disabled={disable} value={name} onChange={(e) => setName(e.target.value.replace(/[^A-Za-z]/, ""))} onKeyUp={validate} id="Name" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div class="form-group mb-3">
                                                    <label for="email">Email</label>
                                                    <input type="email" class="form-control" disabled={disable} value={email} onChange={(e) => setEmail(e.target.value)} onKeyUp={validate} id="email" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div class="form-group mb-3">
                                                    <label for="father">Father Name</label>
                                                    <input type="text" class="form-control" disabled={disable} value={fathername} onChange={(e) => setFathername(e.target.value)} onKeyUp={validate} id="father" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div class="form-group mb-3">
                                                    <label for="mother">Mother Name</label>
                                                    <input type="text" class="form-control" disabled={disable} value={mothername} onChange={(e) => setMothername(e.target.value)} onKeyUp={validate} id="mother" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div class="form-group mb-3">
                                                    <label for="Phone">Phone</label>
                                                    <input type="text" class="form-control" disabled={disable} value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/, ""))} onKeyUp={validate} maxLength="10" minLength="10" id="Phone" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label for="roll">Gender</label>
                                                <div class="form-group mb-3">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" disabled={disable} name="inlineRadioOptions" onChange={(e) => selectgen(e)} id="male" value='male' checked={gender === 'male' ? true : false} />
                                                        <label class="form-check-label" for="male">Male</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" disabled={disable} name="inlineRadioOptions" onChange={(e) => selectgen(e)} id="female" value='female' checked={gender === 'female' ? true : false} />
                                                        <label class="form-check-label" for="female">Female</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div class="form-group mb-3">
                                                    <label for="course">Course</label>
                                                    <input type="text" class="form-control" disabled={disable} value={course} onChange={(e) => setCourse(e.target.value)} onKeyUp={validate} id="course" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div class="form-group mb-3">
                                                    <label for="address">Address</label>
                                                    <textarea class="form-control" disabled={disable} value={address} onChange={(e) => setAddress(e.target.value)} onKeyUp={validate} id="address">
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 text-end">
                                                <Button onClick={updateprof} disabled={updatebtn} variant="contained" color="primary" startIcon={<SaveIcon />}>
                                                    Save
                                            </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
