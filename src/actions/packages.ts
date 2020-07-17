import axios from 'axios';
import { Dispatch } from 'redux'
import { ActionTypes } from './types';
import config from '../config/Config';
import { Common } from '../helpers';
import queryString from 'query-string';

/**============================================================================ */
export interface IPackage {
    PackageName:string,
    DiskQuota : number,
    Bandwidth : number,
    FTPAccounts: number,
    EmailAccounts: number,
}

export interface IRequestPackageAction {
    type: ActionTypes.GET_PACKAGE_REQUEST,
    payload: IPackage[]
}

export interface IResponsePackageAction {
    type: ActionTypes.GET_PACKAGE_REPONSE,
    payload: IPackage[]
}

export const getPackages = () => {

    const config = {
        headers: { Authorization: 'Bearer FHLPSIJTSQ0ZWZEFYFGTAQ1ZQMG17N67'}
    };
    
    return async (dispatch: Dispatch) => {
        const url = "https://host75.registrar-servers.com:2087/cpsess7173534241/json-api/listpkgs?api.version=1&want=all";
        dispatch<IRequestPackageAction>({
            type: ActionTypes.GET_PACKAGE_REQUEST,
            payload: []
        })
        const response = await axios.get<IPackage[]>(url, config);
        dispatch<IResponsePackageAction>({
            type: ActionTypes.GET_PACKAGE_REPONSE,
            payload: response.data
        })
    }
}


