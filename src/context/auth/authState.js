/* eslint-disable no-useless-concat */
import React, {useReducer} from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import {SIGNUP_SUCCESS, GET_USER, SIGNIN_SUCCESS, LOGOUT} from '../../types';
import clientAxios from '../../config/axios';
import authToken from '../../config/authToken';
import {Alert} from '../../components/alert/alert';

const AuthState = props => {

    const initialState = {
       token: localStorage.getItem('token'),
       auth: null,
       user: null,
       loading: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const signUp = async data => {
        try {
            const response = await clientAxios.post('/signup', data);
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: response.data.token
            })

            //get User
            getAuthenticatedUser();
        } catch (error) {
            let arr = [];
            for (var i in error.response.data) {
              arr.push(error.response.data[i]);
            }
            const errorsArray = Object.entries(error.response.data);
            const oldArray = errorsArray[0][1];
            var texto = '';
            for (var e in oldArray){
                texto = texto + '\n' + '- ' + oldArray[e];
            }
            Alert(texto);
        }
    }

    const signIn = async data => {
        try {
            const response = await clientAxios.post('/signin', data);
            if(response.data.message){
                Alert(response.data.message);
                return;
            }
            dispatch({
                type: SIGNIN_SUCCESS,
                payload: response.data.token
            });
            getAuthenticatedUser();
        } catch (error) {
            let arr = [];
            for (var i in error.response.data) {
              arr.push(error.response.data[i]);
            }
            const errorsArray = Object.entries(error.response.data);
            const oldArray = errorsArray[0][1];
            var texto = "";
            for (var e in oldArray){
                texto = texto + "\n" + "-"  + oldArray[e];
            }
            Alert(texto);
        }
    }

    const getAuthenticatedUser = async () => {
        const token = localStorage.getItem('token');
        if(token){
            authToken(token);
        }
        try {
            const response = await clientAxios.get('/user');
            if(response){
                dispatch({
                    type: GET_USER,
                    payload: response.data
                })
            }
            // console.clear();
        } catch (error) {
            // console.clear();
        }
    }

    const logOut = () => {
        dispatch({
            type: LOGOUT
        });
    }


    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            auth: state.auth,
            user: state.user,
            message: state.message,
            loading: state.loading,
            signUp,
            signIn,
            getAuthenticatedUser,
            logOut
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;