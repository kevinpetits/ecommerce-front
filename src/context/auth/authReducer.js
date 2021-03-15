import {SIGNUP_SUCCESS, SIGNUP_ERROR, GET_USER, SIGNIN_SUCCESS, SIGNIN_ERROR, LOGOUT} from '../../types';

const AuthReducer = (state, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
        case SIGNIN_SUCCESS:
            const token = action.payload;
            localStorage.setItem('token', `Bearer ${token}`);
            return {
                ...state,
                auth: true,
                loading: false,
                token: token
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                auth: true,
                loading: false
            }
        case LOGOUT:
        case SIGNIN_ERROR:
        case SIGNUP_ERROR:
            localStorage.removeItem('token');
            localStorage.removeItem('cart');
            return {
                ...state,
                token: null,
                user: null,
                auth: null,
                // message: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default AuthReducer;