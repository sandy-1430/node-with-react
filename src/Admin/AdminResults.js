import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminHome from './AdminHome';
import { Table, TableBody, TextField, TableCell, TableContainer, TableHead, TableRow, Paper, Link, Button, Dialog, DialogContent, DialogTitle, DialogActions, IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import AddStudent from './AddStudent';
import { adminResult, editResult, subjectAdd } from '../actions/adminAction';
import Loadingbox from '../component/Loadingbox';
import { deleteSubject } from '../actions/adminAction';


export default function AdminResults() {
    let history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [editopen, setEditopen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [semester, setSemester] = useState('');
    const [studinfo, setStudinfo] = useState([]);

    const userSignin = useSelector(state => state.userSignin);
    const { admininfo } = userSignin;

    const Result = useSelector(state => state.studentResult);
    const { loading, results } = Result;
    let get_result = results ? results.result : '';

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const editclose = () => {
        setEditopen(false);
        setStudinfo(['']);
        setEdit(false);
    }

    const selectsem = (value) => {
        setSemester(value);
        dispatch(adminResult(value));
    }

    const edit_result = (sem, rollno, sub, code, marks) => {
        setStudinfo(['']);
        if (sem && rollno && sub && code && marks) {
            const obj = { semester: sem, rollno: rollno, subject: sub, code: code, marks: marks };
            setStudinfo([obj]);
            setEdit(true);
            setEditopen(true);
        }
    }

    const delete_subject =(sem, rollno, code)=>{
        dispatch(deleteSubject(sem,rollno,code));
        setSemester('');
    }

    const Editvalues = (e, index) => {
        const edit = studinfo.map((x, key) => {
            if (key === index) {
                x[e.target.name] = e.target.value;
            }
            return x;
        })
        setStudinfo(edit);
    }

    const SaveStudinfo = () => {
        if(edit){
            dispatch(editResult(studinfo[0].semester, studinfo[0].rollno, studinfo[0].subject, studinfo[0].code, studinfo[0].marks));
            setEditopen(false);
        }else{
            dispatch(subjectAdd(studinfo[0].semester, studinfo[0].rollno, studinfo[0].subject, studinfo[0].code, studinfo[0].marks));
            setEditopen(false);
        }  
        setSemester('');
    }

    const propSem = () => {
        setSemester('');
    }

    const addsubject = (sem,rollno) =>{
        setStudinfo(['']);
        if(sem && rollno){
            const obj = { semester: sem, rollno: rollno, subject: '', code: '', marks: '' };
            setStudinfo([obj]);
            setEditopen(true);
        }
    }

    return (
        <div>
            {loading && <Loadingbox />}
            {admininfo ? '' : history.push('/admin')}
            {admininfo &&
                <div>
                    <AdminHome />
                    <div className="container my-3">
                        <div className="row">
                            <div className="col-lg-4 mb-4">
                                <select className="form-control mb-3" value={semester} onChange={((e) => selectsem(e.target.value))}>
                                    <option value="">Select Semester</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </div>
                            <div className="col-lg-2">
                                <Button onClick={handleClickOpen} color="primary" variant="contained">Add Student</Button>
                                <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" size="xl" open={open}>
                                    <div className="d-flex p-2 align-items-center">
                                        <h4 className="m-0">Add Student</h4>
                                        <IconButton className="ms-auto" edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <DialogContent dividers>
                                        <AddStudent close={handleClose} semupdate={propSem} />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        {get_result.length ?
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table" className="cst_table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Roll No</TableCell>
                                            <TableCell align="center">Results</TableCell>
                                            <TableCell align="center">Add Subject</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {get_result && get_result[0].students.map((row) => (
                                            <TableRow>
                                                <TableCell align="center">{row.rollno}</TableCell>
                                                <TableCell>
                                                    <Table className="nested_table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Subject Name</TableCell>
                                                                <TableCell>Subject Code</TableCell>
                                                                <TableCell>Marks</TableCell>
                                                                <TableCell align="center">Edit</TableCell>
                                                                <TableCell align="center">Remove</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        {row.result.map((x) => (
                                                            <TableRow>
                                                                <TableCell width="35%">{x.subject}</TableCell>
                                                                <TableCell>{x.code}</TableCell>
                                                                <TableCell>{x.marks}</TableCell>
                                                                <TableCell align="center">
                                                                    <Link onClick={() => edit_result(get_result[0].semester, row.rollno, x.subject, x.code, x.marks)}><EditIcon color="primary" /></Link>
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <Link onClick={() => delete_subject(get_result[0].semester, row.rollno, x.code)}><DeleteIcon color="secondary" /></Link>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </Table>
                                                </TableCell>
                                                <TableCell align="center"><Link onClick={()=>addsubject(get_result[0].semester,row.rollno)}><AddCircleIcon color="primary" /></Link></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            : ''}

                        <Dialog open={editopen} onClose={editclose} aria-labelledby="edit-student-info">
                            <DialogTitle id="edit-student-info"> 
                                {edit ? "Edit Subject Details" : "Add Student"}
                            </DialogTitle>
                            <DialogContent>
                                {studinfo.map((sub, index) => {
                                        return <div>
                                            <TextField
                                                autoFocus
                                                name="code"
                                                label="Enter Subject Code"
                                                value={sub.code}
                                                fullWidth
                                                disabled={edit ? true : false}
                                                onChange={e => Editvalues(e, index)}
                                            />
                                            <TextField
                                                autoFocus={edit ? true : false}
                                                margin="normal"
                                                name="subject"
                                                label="Enter Subject"
                                                value={sub.subject}
                                                fullWidth
                                                onChange={e => Editvalues(e, index)}
                                            />
                                            <TextField
                                                margin="normal"
                                                name="marks"
                                                label="Enter Marks"
                                                value={sub.marks}
                                                fullWidth
                                                onChange={e => Editvalues(e, index)}
                                            />
                                        </div>
                                    })}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={editclose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={SaveStudinfo} color="primary">
                                    Save Changes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            }
        </div>
    )
}
