
export const errorHandler=({graphQLErrors,networkError})=>{

    if(networkError){
        return "Network Error, check network and try again"
    }

    let message=""

    if(graphQLErrors){
        graphQLErrors.map((item)=>{
            message+=item.message
            return null
        })
    }

    return message;

}