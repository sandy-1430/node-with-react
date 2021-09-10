import Axios from "axios";
import {
    STUDENT_RESULT_REQUEST,
    STUDENT_RESULT_SUCCESS,
    STUDENT_RESULT_FAIL,
    ADMIN_RESULT_REQUEST,
    ADMIN_RESULT_SUCCESS,
    ADMIN_RESULT_FAIL,
    EDIT_RESULT_REQUEST,
    EDIT_RESULT_SUCCESS,
    EDIT_RESULT_FAIL,
    ADD_STUDENT_REQUEST,
    ADD_STUDENT_SUCCESS,
    ADD_STUDENT_FAIL
} from "../constants/studentConstants";


const studentResult = (sem, rollno) => async (dispatch) => {
    dispatch({ type: STUDENT_RESULT_REQUEST, payload: { sem } });
    try {
        const { data } = await Axios.get("https://sandy-node-restapi.herokuapp.com/result/" + sem + "/" + rollno + "");
        dispatch({ type: STUDENT_RESULT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: STUDENT_RESULT_FAIL, payload: error.message });
    }
}

const adminResult = (sem) => async (dispatch) => {
    dispatch({ type: ADMIN_RESULT_REQUEST, payload: { sem } });
    try {
        const { data } = await Axios.get("https://sandy-node-restapi.herokuapp.com/result/" + sem);
        dispatch({ type: ADMIN_RESULT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADMIN_RESULT_FAIL, payload: error.message });
    }
}

const editResult = (sem, rollno, sub, code, marks) => async (dispatch) => {
    dispatch({ type: EDIT_RESULT_REQUEST, payload: { sem } });
    try {
        const { data } = await Axios.put("https://sandy-node-restapi.herokuapp.com/result/subject", { semester: sem, rollno: rollno, subject: sub, code: code, marks: marks });
        dispatch({ type: EDIT_RESULT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: EDIT_RESULT_FAIL, payload: error.message });
    }
}

const Studentadd = (sem, students) => async (dispatch) => {
    dispatch({ type: ADD_STUDENT_REQUEST, payload: { sem } });
    try {
        const { data } = await Axios.post('https://sandy-node-restapi.herokuapp.com/result/student', { semester: sem, students: students });
        dispatch({ type: ADD_STUDENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_STUDENT_FAIL, payload: error.message });
    }
}


export { studentResult, adminResult, editResult, Studentadd };