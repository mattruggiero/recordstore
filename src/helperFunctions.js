import Axios from "axios";

export function getTransformedResult(result,storeIndex){
    let resultObject = {
        artist:result.artist,
        price:result.price,
        title:result.title,
        releaseID:result.releaseID,
        coverImage:result.images[0].uri,
        storeIndex:storeIndex
    }
    return resultObject;

}

export  function isEmpty(value){
    let returnValue = value === undefined || value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0)||
    (typeof value === 'string' && value.trim().length === 0);

    return returnValue;
}


export function setAuthToken(token){
    if(token)
        Axios.defaults.headers.common['Authorization'] = token;
    else
        delete Axios.defaults.headers.common['Authorization'];
}