import { SET_SEARCH_RESULTS } from '../actions/types';

const initialState = {
    searchInput: null,
    haveData:false,
    resultsToDisplay:null,
    pageNumber:1,
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_SEARCH_RESULTS:
            return({
                ...state,
                searchInput: action.searchInput,
                resultsToDisplay: [...action.payload],
                haveData:true,
                pageNumber:action.pageNumber
            })
    default:
        return state;
    }
}