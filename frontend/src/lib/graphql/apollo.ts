import { ApolloClient, HttpLink, ApolloLink, InMemoryCache } from "@apollo/client"
import { SetContextLink } from "@apollo/client/link/context"
import { useAuthStore } from '@/stores/auth'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const httpLink = new HttpLink({
    uri: backendUrl
})

const authLink = new SetContextLink((prevContext) => {
    const token = useAuthStore.getState().token
    return {
        headers: {
            ...prevContext.headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache()
})