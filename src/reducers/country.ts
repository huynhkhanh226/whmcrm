import { ICountry, ActionTypes, Actions } from '../actions'

export const countryReducer = (state: ICountry[] = [],
    action: Actions) => {
    switch (action.type) {
        case ActionTypes.GET_COUNTRIES:
            return action.payload
        default:
            return state;
    }
}