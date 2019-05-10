
import * as actionTypes from './actions';

const initialState = {
    searchInput: null,
    haveData:false,
    resultsToDisplay :null,
    pageNumber:1,
    display: 'results',
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
            console.log("SET_SEARCH_INPUT: works");
            return({
                ...state,
                searchInput: action.searchInput,
            })
        default: return(state);
    }
}


export default reducer;