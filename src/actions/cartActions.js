import { SET_CART } from './types';
import store from '../store';
import axios from 'axios';

export function setCart(recordDBID){
    let url = '/cart';
    let postData = { recordDBID:recordDBID};

    axios({method:'post', url:url,data:postData})
        .then(response => {
            console.log(response);
            store.dispatch({
                type:SET_CART,
                payload:response.data,
            })
        })


}

// export function registerUser(userData){
//     let url = '/register';
//     let postData = userData;

//     axios({method: 'post', url:url,data:postData})
//         .then(response =>{
//             console.log(response)
//             login(response.data);
//             window.location.href = '/';
//         })
//         .catch(error => {
//             store.dispatch({
//                 type:GET_ERRORS,
//                 payload: error.response.data
//             })
//         })
// }