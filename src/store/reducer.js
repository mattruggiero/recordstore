
import * as actionTypes from './actions';
import * as helper from '../middleware/helperFunctions';

const initialState = {
    searchInput: null,
    haveData:false,
    resultsToDisplay :null,
    pageNumber:1,
    display: 'results',
    isAuthenticated:false,
    user:{}
};

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.DISPLAY_RESULTS:
            return ({
                ...state,
                searchInput: action.searchInput,
                resultsToDisplay : [...action.payload],
                haveData:true,
                pageNumber:action.pageNumber
            })
        case actionTypes.SET_SEARCH_INPUT:
            return({
                ...state,
                searchInput: action.searchInput,
            })
        case actionTypes.SET_CURRENT_USER:
        console.log("set current user called");
            return {
                ...state,
                isAuthenticated: !helper.isEmpty(action.payload),
                user: action.payload
            }
        default: return(state);
    }
}


export default reducer;