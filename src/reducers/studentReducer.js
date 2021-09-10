import {
    STUDENT_RESULT_REQUEST,
    STUDENT_RESULT_SUCCESS,
    STUDENT_RESULT_FAIL,
    ADMIN_RESULT_REQUEST,
    ADMIN_RESULT_SUCCESS,
    ADMIN_RESULT_FAIL,
    EDIT_RESULT_REQUEST,
    EDIT_RESULT_SUCCESS,
    EDIT_RESULT_FAIL
} from "../constants/studentConstants";

function studentResultReducer(state = {}, action) {
    switch (action.type) {
        case STUDENT_RESULT_REQUEST:
            return { loading: true };
        case STUDENT_RESULT_SUCCESS:
            return { loading: false, results: action.payload };
        case STUDENT_RESULT_FAIL:
            return { loading: false, error: action.payload };
        case ADMIN_RESULT_REQUEST:
            return { loading: true };
        case ADMIN_RESULT_SUCCESS:
            return { loading: false, results: action.payload };
        case ADMIN_RESULT_FAIL:
            return { loading: false, error: action.payload };
        case EDIT_RESULT_REQUEST:
            return { loading: true };
        case EDIT_RESULT_SUCCESS:
            return { loading: false, editresult: action.payload };
        case EDIT_RESULT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
export {
    studentResultReducer
};