import {
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOGOUT,PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,ACTIVATION_FAIL,
    ACTIVATION_SUCCESS
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    error: null // Add error state to handle login failure
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                error: null
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access); 
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                error: null // Clear error on successful login
            };
        case SIGNUP_SUCCESS:
            return{
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
            };
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                error: null
            };
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
            };
        case LOGIN_FAIL:        
            return {
                ...state,
                isAuthenticated: false,
                error: "Invalid credentials, please try again." // Set specific error message on login failure
            };
        case LOGOUT:
        case SIGNUP_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null,
                error: null
            };
        case PASSWORD_RESET_CONFIRM_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case ACTIVATION_FAIL:
        case ACTIVATION_SUCCESS:
            return{
                ...state
            }
        default:
            return state;
    }
}
