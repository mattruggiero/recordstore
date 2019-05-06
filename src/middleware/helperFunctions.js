




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
