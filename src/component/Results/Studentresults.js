import React, { useState } from 'react';
import './Studentresult.css';
import { useSelector, useDispatch } from 'react-redux';
import { studentResult } from '../../actions/studentAction';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@material-ui/core';
import Loadingbox from '../Loadingbox';
import Alert from '@material-ui/lab/Alert';

export default function Studentresults() {
    const [sem, setSem] = useState('');
    const [rollno, setRollno] = useState('');
    const [disable, setDisable] = useState(true);
    const dispatch = useDispatch();
    const Result = useSelector(state => state.studentResult);
    const { loading, results, error } = Result;
    let studentresult = results ? results.result[0].result : '';

    const selectsem = (e) => {
        setSem(e.target.value);
        console.log(e.target.value);
        if (e.target.value !== '' && rollno) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }

    const validate = () => {
        if (rollno && sem) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }

    const showresult = () => {
        dispatch(studentResult(sem, rollno));
    }


    return (
        <div className="px-4">
            <div className="row justify-content-center">
                <div className="col-lg-4">
                    <select className="form-control mb-3" onChange={((e) => selectsem(e))}>
                        <option value="">Select Semester</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <input type="text" className="form-control mb-3" onChange={(e) => setRollno(e.target.value)} onKeyUp={validate} placeholder="Enter Your Register Number" />
                    <Button variant="contained" disabled={disable} onClick={showresult} color="primary">
                        View Results
                    </Button>
                </div>
            </div>
            {loading && <Loadingbox />}
            {results &&
                <div className="row my-4">
                    <div className="col-lg-12">
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Subject Name</TableCell>
                                        <TableCell align="right">Subject Code</TableCell>
                                        <TableCell align="right">Marks</TableCell>
                                        <TableCell align="right">Result</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {studentresult.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.subject}
                                            </TableCell>
                                            <TableCell align="right">{row.code}</TableCell>
                                            <TableCell align="right">{row.marks}</TableCell>
                                            <TableCell align="right">{row.marks > 35 ? 'P' : 'Ar'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            }
            {error &&
                <div className="row justify-content-center">
                    <div className="col-lg-4 py-3">
                        <Alert severity="error">Enter Valid Register Number</Alert>
                    </div>
                </div>
            }
        </div>
    )
}
