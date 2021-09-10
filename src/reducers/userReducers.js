import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    ADMIN_SIGNIN_REQUEST,
    ADMIN_SIGNIN_SUCCESS,
    ADMIN_SIGNIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAIL,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    USER_LOGOUT
} from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case ADMIN_SIGNIN_REQUEST:
            return { loading: true };
        case ADMIN_SIGNIN_SUCCESS:
            return { loading: false, admininfo: action.payload };
        case ADMIN_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case PROFILE_UPDATE_REQUEST:
            return { loading: true, userInfo: action.payload };
        case PROFILE_UPDATE_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case PROFILE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case CHANGE_PASSWORD_REQUEST:
            return { loading: true };
        case CHANGE_PASSWORD_SUCCESS:
            return { loading: false, change_pass: action.payload };
        case CHANGE_PASSWORD_FAIL:
            return { loading: false, change_pass_error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
}

function userSignupReducer(state = {}, action) {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, registerinfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export {
    userSigninReducer,
    userSignupReducer
};