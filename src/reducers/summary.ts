import { ISummary, ActionTypes, Actions } from '../actions'

export const summaryReducer = (state: ISummary = {},
    action: Actions) => {
    switch (action.type) {
        case ActionTypes.GET_SUMMARY_REPONSE:
            return action.payload
        case ActionTypes.GET_SUMMARY_REPONSE:
            return action.payload
        default:
            return state;
    }
}