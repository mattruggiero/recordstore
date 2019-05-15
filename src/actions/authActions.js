import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../helperFunctions';
import store from '../store';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export async function registerUser(userData){
    try{
        let url = '/register';
        let postData = userData;

        let response = await axios({method:'post',url:url,data:postData});
        console.log(response);
    }
    catch(error){
        store.dispatch({
            type: GET_ERRORS,
            payload: error.response.data,
        })
    }
}


export async function login(userLoginData){
    try{
        let url = '/login';
        let postData = userLoginData;

        let response = await axios({method: 'post',url:url,data:postData});
        const { token } = response.data;

        //save to local storage 
        localStorage.setItem('jwtToken',token);

        //Set token to Auth header
        setAuthToken(token);
        const decoded = jwt_decode(token);

        store.dispatch({
            type:SET_CURRENT_USER,
            payload:decoded,
        })
    }
    catch(error){
        store.dispatch({
            type: GET_ERRORS,
            payload: error.response.data,
        })
    }
}

export function logoutUser(){
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    store.dispatch({
        type:SET_CURRENT_USER,
        payload:{}
    })
}