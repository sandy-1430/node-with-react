import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, IconButton } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { Studentadd } from '../actions/studentAction';

export default function AddStudent(props) {
    const dispatch = useDispatch();
    const [sem, setSem] = useState('');
    const [addstu, setAddstu] = useState([
        { rollno: '', result: [{ code: '', subject: '', marks: '' }] },
    ]);

    const addselectsem = (e) => {
        setSem(e.target.value);
    }

    const Student_add = () => {
        setAddstu([...addstu, { rollno: '', result: [{ code: '', subject: '', marks: '' }] }]);
    }

    const changeRoll = (key, event) => {
        // const filter = addstu.filter((x, index) => index !== key);
        const rollno = addstu.map((x, index) => {
            if (index === key) {
                x[event.target.name] = event.target.value;
            }
            return x;
        })
        setAddstu(rollno);
    }

    const RemoveStudent = (key) => {
        const filter = addstu.filter((x, index) => index !== key);
        setAddstu(filter);
    }

    const Addsubject = (key) => {
        const filter = addstu.filter((x, index) => index !== key);
        const add_sub = { code: '', subject: '', marks: '' };
        const sub = [...addstu[key].result, add_sub];
        const add = { rollno: addstu[key].rollno, result: sub };
        if (filter.length) {
            filter.splice(key, 0, add);
            setAddstu(filter);
        } else {
            setAddstu([add]);
        }
    }

    const changesubject = (index, event, key) => {
        const filter = addstu.filter((x, index) => index !== key);
        const editsub = addstu[key].result.map((y, inner_index) => {
            if (index === inner_index) {
                y[event.target.name] = event.target.value
            }
            return y;
        })
        const add = { rollno: addstu[key].rollno, result: editsub };
        if (filter.length) {
            filter.splice(key, 0, add);
            setAddstu(filter);
        } else {
            setAddstu([add]);
        }
    }

    const Removesubject = (key, index) => {
        const values = [...addstu];
        console.log(values[key].result.findIndex((x, y) => y === index));
        values[key].result.splice(values[key].result.findIndex((x, y) => y === index), 1);
        setAddstu(values);
    }

    const onsubmit = () => {
        dispatch(Studentadd(sem, addstu));
        props.close();
        props.semupdate();
    }

    return (
        <div>
            <div className="row align-items-center">
                <div className="col-lg-2">
                    <FormControl required margin="normal" fullWidth>
                        <InputLabel id="select-sem">Select Semester</InputLabel>
                        <Select value={sem} onChange={(e) => addselectsem(e)} labelId="select-sem">
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            {addstu.map((student, key) => (
                <div className="row align-items-center">
                    <div className="col-lg-3">
                        <TextField
                            margin="normal"
                            required
                            name="rollno"
                            fullWidth
                            label="Enter Roll No"
                            autoFocus
                            value={student.rollno}
                            onChange={event => changeRoll(key, event)}
                        />
                    </div>
                    <div className="col-lg-7">
                        {student.result.map((sub, index) => {
                            return (
                                <div className="row align-items-end">
                                    <div className="col-lg-3">
                                        <TextField
                                            margin="normal"
                                            required
                                            name="code"
                                            fullWidth
                                            label="Subject Code"
                                            value={sub.code}
                                            onChange={event => changesubject(index, event, key)}
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <TextField
                                            margin="normal"
                                            name="subject"
                                            required
                                            fullWidth
                                            label="Subject Name"
                                            value={sub.subject}
                                            onChange={event => changesubject(index, event, key)}
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <TextField
                                            margin="normal"
                                            name="marks"
                                            required
                                            fullWidth
                                            label="Marks"
                                            value={sub.marks}
                                            onChange={event => changesubject(index, event, key)}
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <IconButton color="primary" label="Add" onClick={() => Addsubject(key)} >
                                            <AddCircleIcon />
                                        </IconButton>
                                        <IconButton color="secondary" disabled={addstu[key].result.length === 1} onClick={() => Removesubject(key, index)}>
                                            <RemoveCircleIcon />
                                        </IconButton>
                                    </div>
                                </div>)
                        })}
                    </div>
                    <div className="col-lg-2">
                        <IconButton color="primary" onClick={Student_add}>
                            <AddCircleIcon />
                        </IconButton>
                        <IconButton color="secondary" disabled={addstu.length === 1} onClick={() => RemoveStudent(key)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            ))}
            <div className="row">
                <div className="col-lg-12 text-end">
                    <Button onClick={onsubmit} variant="contained" color="primary">Add Student</Button>
                </div>
            </div>
        </div>
    )
}
