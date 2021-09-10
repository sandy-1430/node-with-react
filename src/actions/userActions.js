import Axios from "axios";
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

const signup = (username, email, password, phone, gender, course, address, fathername, mothername) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: {} });
    try {
        const { data } = await Axios.post("/student/signup",
            {
                username: username,
                email: email,
                phone: phone,
                password: password,
                gender: gender,
                course: course,
                address: address,
                fathername: fathername,
                mothername: mothername
            }
        );
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
};

const profileupdate = (_id, username, email, phone, gender, course, address, fathername, mothername) => async (dispatch) => {
    dispatch({ type: PROFILE_UPDATE_REQUEST, payload: { username } });
    try {
        const { data } = await Axios.put("/student/login",
            {
                _id: _id,
                username: username,
                email: email,
                phone: phone,
                gender: gender,
                course: course,
                address: address,
                fathername: fathername,
                mothername: mothername
            }
        );
        dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data.token });
        localStorage.setItem("userInfo", JSON.stringify(data.token));
    } catch (error) {
        dispatch({ type: PROFILE_UPDATE_FAIL, payload: error.message });
    }
}

const signin = (username, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { username } });
    try {
        const { data } = await Axios.post("/student/login", { email: username, password: password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.token });
        localStorage.setItem("userInfo", JSON.stringify(data.token));
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
}

const admin_signin = (username, password) => async (dispatch) => {
    dispatch({ type: ADMIN_SIGNIN_REQUEST, payload: { username } });
    try {
        const { data } = await Axios.post("/user/login", { email: username, password: password });
        dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: data.token });
        localStorage.setItem("admininfo", JSON.stringify(data.token));
    } catch (error) {
        dispatch({ type: ADMIN_SIGNIN_FAIL, payload: error.message });
    }
}

const change_password = (email, password) => async (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD_REQUEST, payload: { email } });
    try {
        const { data } = await Axios.post("/student/forget-password", { email: email, password: password });
        dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CHANGE_PASSWORD_FAIL, payload: error.message });
    }
}

const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("admininfo");
    dispatch({ type: USER_LOGOUT });
};

export { signin, logout, signup, profileupdate, change_password, admin_signin };
