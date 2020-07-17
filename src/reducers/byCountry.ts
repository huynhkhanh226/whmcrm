import { ActionTypes, Actions, IByCountry } from '../actions'

export const byCountryReducer = (state: IByCountry[] = [],
    action: Actions) => {
    switch (action.type) {
        case ActionTypes.GET_BY_COUNTRY_REQUEST:
            return action.payload
        case ActionTypes.GET_BY_COUNTRY_REPONSE:
            return action.payload
        default:
            return state;
    }
}