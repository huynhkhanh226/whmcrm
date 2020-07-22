import axios from 'axios';
import { Dispatch } from 'redux'
import { ActionTypes } from './types';
import config from '../config/Config';
import { Common } from '../helpers';
import queryString from 'query-string';

/**============================================================================ */
export interface IUser {
    username: string,
    password: string,
    email: string,
    mobile: string,
}

export interface IRequestRegisterAction {
    type: ActionTypes.USER_REGISTER_REQUEST,
}

export interface IResponseRegisterAction {
    type: ActionTypes.USER_REGISTER_RESPONSE,
}

export interface IResponseRegister{
    code: number | string,
    message: string,
}

export const register = (data: IUser, cb: (res : IResponseRegister)=>void) => {
    return async (dispatch: Dispatch) => {
        const url = "http://127.0.0.1:1337/api/v1/users/register";
        dispatch<IRequestRegisterAction>({
            type: ActionTypes.USER_REGISTER_REQUEST,
        })
        const response = await axios.post<IResponseRegister>(url, data);
        dispatch<IRequestRegisterAction>({
            type: ActionTypes.USER_REGISTER_REQUEST,
        })

        if (cb){
            cb(response.data);
        }
    }
}

export interface IRequestProfileAction {
    type: ActionTypes.USER_PROFILE_REQUEST,
}

export interface IResponseProfileAction {
    type: ActionTypes.USER_PROFILE_RESPONSE,
    payload: IUser
}

export interface IResponseProfile{
    code: number | string,
    message?: string,
    data?: IUser
}


export const login = (inputs: {
    username: string,
    password: string,
}, cb: (res : IResponseProfile)=>void) => {
    return async (dispatch: Dispatch) => {
        const url = "http://127.0.0.1:1337/api/v1/users/login";
        dispatch<IRequestProfileAction>({
            type: ActionTypes.USER_PROFILE_REQUEST,
        })
        const response = await axios.post<IResponseProfile>(url, inputs);
        console.log(response);
        dispatch<IResponseProfileAction>({
            type: ActionTypes.USER_PROFILE_RESPONSE,
            payload: response.data.data as IUser
        })

        if (cb){
            cb(response.data);
        }
    }
}


