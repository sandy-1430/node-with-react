import Axios from "axios";
import {
    STUDENT_RESULT_REQUEST,
    STUDENT_RESULT_SUCCESS,
    STUDENT_RESULT_FAIL
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




export { studentResult };
