import axios from 'axios';
import {
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOGOUT,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS
} from '../actions/types';


export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({token: localStorage.getItem('access')});

        try{
            const res = await axios.post('http://localhost:8000/auth/jwt/verify/', body, config);
            console.log("in auth")
            if (res.data.code !== 'token_not_valid'){
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            }
            else{
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        }
        catch(err){
            dispatch({
                type: AUTHENTICATED_FAIL
            })
        }
    }else{
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}
export const load_user =() => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get('http://localhost:8000/auth/users/me/', config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
            dispatch(checkAuthenticated())
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('http://localhost:8000/auth/jwt/create/', body, config);

        localStorage.setItem('access', res.data.access);


        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        console.log(err);
        dispatch({
            type: LOGIN_FAIL
        });
    }
};


export const signup = (name,email, phone, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const body = JSON.stringify({ name ,email, phone, password , re_password});

    try {
        const res = await axios.post('http://localhost:8000/auth/users/', body, config);
        
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });   
        return res     
    } catch (err) {
        console.log(err);
        dispatch({
            type: SIGNUP_FAIL
        });
        return err.response;
    }
};

export const logout =() => dispatch =>{
    dispatch({
        type:LOGOUT
    })
}


export const verify = (uid,token) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const body = JSON.stringify({ uid , token});

    try {
        const res = await axios.post('http://localhost:8000/auth/users/activation/', body, config);

      


        dispatch({
            type: ACTIVATION_SUCCESS,
        });        
        return true
    } catch (err) {
        console.log(err);
        dispatch({
            type: ACTIVATION_FAIL
        });
        return false
    }
}

export const reset_password = (email) => async dispatch =>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }    
    }
    const body =JSON.stringify({email});

    try{
        await axios.post('http://localhost:8000/auth/users/reset_password/', body , config);

        dispatch({
            type:PASSWORD_RESET_SUCCESS
        })
    }catch (err) {
        console.error(err.response || err.message);
        dispatch({
            type: PASSWORD_RESET_FAIL,
        });
    }
}


export const reset_password_confirm = (uid , token , new_password , re_new_password) => async dispatch =>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }    
    }
    const body =JSON.stringify({uid,token, new_password,re_new_password});


    try{
        await axios.post('http://localhost:8000/auth/users/reset_password_confirm/', body , config);

        dispatch({
            type:PASSWORD_RESET_CONFIRM_SUCCESS
        })
        return true;
    }catch(err){
       dispatch({
        type:PASSWORD_RESET_CONFIRM_FAIL
       }) 
       return false
    }
}
