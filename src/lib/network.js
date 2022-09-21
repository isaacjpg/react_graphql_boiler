import {ApolloClient, InMemoryCache} from '@apollo/client'

const url = 'http://localhost:8000/graphview/'

export const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache()
})

export const getClientHeaders = (access) => {
    return {
      headers: {
        AUTHORIZATION: `JWT ${access}`,
      },
    };
};




