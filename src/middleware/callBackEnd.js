import axios from 'axios';
import * as actionTypes from '../store/actions';
import store from '../index';



export async function getResults(searchingForSomething,pageNumber){
    try{
        let url = '/browseAll';
        let postData = {searchInput:false};

        if(searchingForSomething){
            url = '/search';
            postData = {searchInput:searchingForSomething+'',pageNumber:pageNumber};
            
        }
        
        let response = await axios({method: 'post',url: url,data:postData});
        store.dispatch({
            type:actionTypes.DISPLAY_RESULTS,
            payload:response.data.recordData,
            pageNumber: response.data.pageNumber,
            display:'Results',
        });
        return response.data;
    }
    catch(error){return error;}
};


