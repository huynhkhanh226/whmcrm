//import { FetchToDosAction, DeleteToDoAction } from "./todos";
import { ISummaryRequestAction, ISummaryResponseAction } from "./summary";
import { ICountryAction, IByCountryRequestAction, IByCountryResponseAction } from "./country";

export enum ActionTypes {
    GET_SUMMARY_REQUEST = "GET_SUMMARY_REQUEST",
    GET_SUMMARY_REPONSE = "GET_SUMMARY_REPONSE",
    GET_COUNTRIES = "GET_COUNTRIES",
    GET_BY_COUNTRY_REQUEST = "GET_BY_COUNTRY_REQUEST",
    GET_BY_COUNTRY_REPONSE = "GET_BY_COUNTRY_REPONSE",
}

export type Actions = ISummaryRequestAction | ISummaryResponseAction | ICountryAction | IByCountryRequestAction | IByCountryResponseAction

