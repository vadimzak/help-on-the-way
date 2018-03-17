import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
const link = new HttpLink({
    uri: `${process.env.SERVER_BASE_URL}/graphql`,
    credentials: 'include'
});

const cache = new InMemoryCache();
const client = new ApolloClient({
    link,
    cache,
    connectToDevTools: true,
})

const provider = new VueApollo({
    defaultClient: client,
});

function install(Vue) {
    Vue.use(VueApollo);
}

export {
    provider,
    client,
    install,
}
