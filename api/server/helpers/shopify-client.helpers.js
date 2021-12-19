import Shopify, { DataType } from '@shopify/shopify-api';

class CreatClient {
    constructor(){
    }

    restClient = (shop, token) => {
        const client = new Shopify.Clients.Rest(shop, token);

        return {client, DataType};
    } 

    graphQLClient = () => {
        const client = new Shopify.Clients.Graphql(this.shop, this.token);

        return client;
    } 
}

export default CreatClient;