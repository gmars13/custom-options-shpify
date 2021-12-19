import db from './db'
import CreatClient from '../helpers/shopify-client.helpers'

class ShopModel{
    constructor(){}

    fetchAccessToken = async (shop) => {
        let store = shop.replace("https:\/\/", "")
        return new Promise((resolve, reject)=>{
            db.query('SELECT id, name, access_token FROM shops WHERE name =?', [store], (err, result)=>{
                if(err) {
                    return reject(err)
                }
                return resolve(result)
            })
        })
    }

    
    createProductOptions = async (query) => {
        let [shopData] = await this.fetchAccessToken(query.shop);
        console.log(shopData)
        let createClient = new CreatClient()
        let {client, DataType} = createClient.restClient(shopData.name, shopData.access_token)
        console.log(client)
        const params = {
            "product": {
                "title":"Working API Custom Product",
                "body_html":"Custom product",
                "variants": [{"option1":"First","price":`100.00`,"sku":"123"}]
            }
        };

        const data = await client.post({
            path: 'products',
            data: params,
            type: DataType.JSON,
        });

        return data
    }

    registerShop = async (params) => {
        return new Promise((resolve, reject)=>{
            db.query('INSERT INTO shops (name, access_token, created_at, updated_at) VALUES (?, ?, ?, ?);', [params.shop, params.token, new Date(), new Date()], (err, result)=>{
                if(err) {
                    return reject(err)
                }
                return resolve(result)
            })
        })
    }
}

export default ShopModel;