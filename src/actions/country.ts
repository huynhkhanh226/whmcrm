import axios from 'axios';
import { Dispatch } from 'redux'
import { ActionTypes } from './types';
import config from '../config/Config';
import { Common } from '../helpers';
import queryString from 'query-string';

/**============================================================================ */
export interface ICountry {
    Country: string,
    Slug: string,
    ISO2: string
}

export interface IStatus {
    Confirmed: number,
    Deaths: number,
    Recovered: number,
}

export interface IByCountry extends IStatus {
    Country: string,
    CountryCode: string,
    Lat: string,
    Lon: string,
    Cases: number,
    Status: string,
    Date: string
}

export interface ICountryAction {
    type: ActionTypes.GET_COUNTRIES,
    payload: ICountry[]
}

export const getCountries = () => {
    return async (dispatch: Dispatch) => {
        const url = "https://api.covid19api.com/countries";
        const response = await axios.get<ICountry[]>(url);
        dispatch<ICountryAction>({
            type: ActionTypes.GET_COUNTRIES,
            payload: response.data
        })
    }
}

/**============================================================================ */
export interface IByCountryRequestAction {
    type: ActionTypes.GET_BY_COUNTRY_REQUEST,
    payload: IByCountry[]
}

export interface IByCountryResponseAction {
    type: ActionTypes.GET_BY_COUNTRY_REPONSE,
    payload: IByCountry[]
}

export interface IParamByCountry {
    country: string,
    status?: string,
    from?: string | Date,
    to?: string | Date,
}

export const getByCountry = (params: IParamByCountry, callback?: ()=>void) => {
    return async (dispatch: Dispatch) => {
        const url = Common.getUrl("/country/" + params.country)
            + (params.status ? "/status/" + params.status : "")
            + (params.from ? "?from=" + params.from : "")
            + (params.to ? "&to=" + params.to : "");

        dispatch<IByCountryRequestAction>({
            type: ActionTypes.GET_BY_COUNTRY_REQUEST,
            payload: []
        })
        const response = await axios.get<IByCountry[]>(url);
        if (response.status == 200){
            dispatch<IByCountryResponseAction>({
                type: ActionTypes.GET_BY_COUNTRY_REPONSE,
                payload: response.data
            })
        }else{
            if (callback){
                callback();
            }
        }
        
        
    }
}


