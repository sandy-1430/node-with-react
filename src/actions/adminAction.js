import Axios from "axios";
import {
    ADMIN_RESULT_REQUEST,
    ADMIN_RESULT_SUCCESS,
    ADMIN_RESULT_FAIL,
    EDIT_RESULT_REQUEST,
    EDIT_RESULT_SUCCESS,
    EDIT_RESULT_FAIL,
    ADD_STUDENT_REQUEST,
    ADD_STUDENT_SUCCESS,
    ADD_STUDENT_FAIL,
    ADD_SUBJECT_REQUEST,
    ADD_SUBJECT_SUCCESS,
    ADD_SUBJECT_FAIL,
    DELETE_SUBJECT_REQUEST,
    DELETE_SUBJECT_SUCCESS,
    DELETE_SUBJECT_FAIL
} from "../constants/studentConstants";


const adminResult = (sem) => async (dispatch) => {
    dispatch({ type: ADMIN_RESULT_REQUEST, payload: { sem } });
    try {
        const { data } = await Axios.get("/result/" + sem);
        dispatch({ type: ADMIN_RESULT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADMIN_RESULT_FAIL, payload: error.message });
    }
}

const editResult = (sem, rollno, sub, code, marks) => async (dispatch) => {
    dispatch({ type: EDIT_RESULT_REQUEST, payload: { sem } });
    try {
        const { data } = await Axios.put("/result/subject", { semester: sem, rollno: rollno, subject: sub, code: code, marks: marks });
        dispatch({ type: EDIT_RESULT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: EDIT_RESULT_FAIL, payload: error.message });
    }
}

const subjectAdd = (sem, rollno, sub, code, marks) => async (dispatch) => {
    dispatch({ type: ADD_SUBJECT_REQUEST, payload: { sem } });
    try {
        const { data } = await Axios.post("/result/subject", { semester: sem, rollno: rollno, subject: sub, code: code, marks: marks });
        dispatch({ type: ADD_SUBJECT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_SUBJECT_FAIL, payload: error.message });
    }
}

const Studentadd = (sem, students) => async (dispatch) => {
    dispatch({ type: ADD_STUDENT_REQUEST, payload: { sem } });
    try {
        const { data } = await Axios.post('/result/student', { semester: sem, students: students });
        dispatch({ type: ADD_STUDENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_STUDENT_FAIL, payload: error.message });
    }
}

const deleteSubject = (sem, rollno,code) => async (dispatch) => {
    dispatch({ type: DELETE_SUBJECT_REQUEST, payload: { sem } });
    try {
        const { data } = await Axios.delete("/result/" + sem + "/" + rollno +  "/" + code );
        dispatch({ type: DELETE_SUBJECT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELETE_SUBJECT_FAIL, payload: error.message });
    }
}



export { adminResult, editResult, Studentadd, subjectAdd, deleteSubject };