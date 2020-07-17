import { combineReducers } from 'redux';
import { ICountry, IByCountry, ISummary } from '../actions';
import { summaryReducer } from './summary';
import { countryReducer } from './country';
import { byCountryReducer } from './byCountry'


export interface IStoreState {
    summary: ISummary,
    countries: ICountry[],
    byCountries: IByCountry[]
}
export const reducers = combineReducers<IStoreState>({
    summary: summaryReducer,
    countries: countryReducer,
    byCountries: byCountryReducer,
});