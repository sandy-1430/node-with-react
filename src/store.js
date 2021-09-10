import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
    userSigninReducer,
    userSignupReducer,
} from "./reducers/userReducers";
import { studentResultReducer } from "./reducers/studentReducer";

const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
const admininfo = JSON.parse(localStorage.getItem("admininfo")) || null;

const initialState = {
    userSignin: { userInfo, admininfo },
};

const reducer = combineReducers({
    userSignin: userSigninReducer,
    registerDetail: userSignupReducer,
    studentResult: studentResultReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;