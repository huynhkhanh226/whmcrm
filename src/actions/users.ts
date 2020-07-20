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

export interface IResponse{
    code: number | string,
    data: IUser 
}

export interface IRequestRegisterAction {
    type: ActionTypes.USER_REGISTER_REQUEST,
    payload: IResponse | undefined
}

export interface IResponseRegisterAction {
    type: ActionTypes.GET_PACKAGE_REPONSE,
    payload: IUser
}

export const register = (cb: (res : IResponse)=>void) => {

    return async (dispatch: Dispatch) => {
        const url = "http://127.0.0.1:1337/api/v1/users/register";
        const response = await axios.post<IResponse>(url);
    }
}


