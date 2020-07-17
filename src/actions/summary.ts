import axios from 'axios';
import { Dispatch } from 'redux'
import { ActionTypes } from './types';
import { Common } from '../helpers';

export interface IGlobal {
    NewConfirmed: number,
    TotalConfirmed: number,
    NewDeaths: number,
    TotalDeaths: number,
    NewRecovered: number,
    TotalRecovered: number
}

export interface ISummaryCountry {
    Country: string,
    CountryCode: string,
    Slug: string,
    NewConfirmed: number,
    TotalConfirmed: number,
    NewDeaths: number,
    TotalDeaths: number,
    NewRecovered: number,
    TotalRecovered: number,
    Date: string
}

export interface ISummary {
    global?: IGlobal,
    countries?: ISummaryCountry[]
}

export interface ISummaryRequestAction {
    type: ActionTypes.GET_SUMMARY_REQUEST,
    payload: ISummary
}

export interface ISummaryResponseAction {
    type: ActionTypes.GET_SUMMARY_REPONSE,
    payload: ISummary
}

export const getSummary = (callback?: ()=>void) => {
    return async (dispatch: Dispatch) => {
        const url = Common.getUrl("/summary");
        dispatch<ISummaryRequestAction>({
            type: ActionTypes.GET_SUMMARY_REQUEST,
            payload: {}
        })
        const response = await axios.get(url);
        if (response.status == 200){
            dispatch<ISummaryResponseAction>({
                type: ActionTypes.GET_SUMMARY_REPONSE,
                payload: Common.convertResponse<ISummary>(response.data)
            })
        }else{
            if (callback){
                callback();
            }
        }
        
    }
}


