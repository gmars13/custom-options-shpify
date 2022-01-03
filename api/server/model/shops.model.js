import db from './db/index'
import query from './db/query'
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

    fetchFunction = async (shop_id, product_id) => {
        let result = await query('SELECT product_function FROM product_custom_options WHERE shop_id =? AND product_id =?', [shop_id, product_id])
        
        return result;
    }

    
    createProductOptions = async (price, shop) => {
        try {
            let [shopData] = await this.fetchAccessToken(shop);
            let createClient = new CreatClient()
            let {client, DataType} = createClient.restClient(shopData.name, shopData.access_token)
            
            const params = {
                "product": {
                    "title":"Working API Custom Product",
                    "body_html":"Custom product",
                    "variants": [{"option1":"First","price":`${price}`,"sku":"123"}]
                }
            };

            const data = await client.post({
                path: 'products',
                data: params,
                type: DataType.JSON,
            });

            return data
        } catch (error) {
            console.log(error.message)
        }
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

    createProductCustomOptions = async (params) => {
        let [store_data] = await this.fetchAccessToken(params.shop);
        
        let generate_function = () => {
            let response = {status : false, result : null, error : ""}

            try {
                let { fill, thickness = +thickness, depth = +depth, width = +width, welting, shop, ties, shape, fabric } = params.body;
                let fabric_options = ["red", "blue", "green"];
                let shape_options = ["rectangular", "trapezoid"];
                let defaultFoamPrice = {
                    "Soft" : 0.6,
                    "Medium": 0.8,
                    "Firm": 1.4,
                    "Cover": 0
                };
                let tiesCount = {
                    "none" : 0,
                    "side" : 2,
                    "standard" : 2,
                    "double" : 4
                };
                let cushionSizePrice = {
                    "Small" : {
                        "welting" : {
                            "single" : 18,
                            "double" : 24,
                            "none" : 0,
                        },
                        "productType" : 1.85
                    },
                    "Medium" : {
                        "welting" : {
                            "single" : 28,
                            "double" : 35,
                            "none" : 0,
                        },
                        "productType" : 2.00
                    },
                    "Large" : {
                        "welting" : {
                            "single" : 36,
                            "double" : 48,
                            "none" : 0,
                        },
                        "productType" : 2.2
                    } 
                };
                let dimensionsMax = Math.max(thickness, depth, width);
                let cushionSize = dimensionsMax <= 25 ? "Small" : dimensionsMax <= 70 ? "Medium" : "Large";

                if( cushionSizePrice[`${cushionSize}`].welting[`${welting}`] === undefined ||
                    defaultFoamPrice[`${fill}`] === undefined ||
                    tiesCount[`${ties}`] === undefined ||
                    !fabric_options.includes(fabric) || 
                    !shape_options.includes(shape)
                ){
                    throw Error ("Invalid selected options");
                }
                
                let defaultFabricPrice = 29.95;
                let pricePerTie = 4;

                let surfaceArea = ((thickness * depth) + (thickness * width) + (depth * width)) * 2;
            
                let newPrice = (
                    (thickness * depth * width)/144 * defaultFoamPrice[`${fill}`] + 
                    Math.ceil(surfaceArea / 1944) * 1.2 * defaultFabricPrice + 
                    cushionSizePrice[`${cushionSize}`].welting[`${welting}`] + 
                    tiesCount[`${ties}`] * pricePerTie
                    ) * cushionSizePrice[`${cushionSize}`].productType;
            
                let create_product_result = params.createProductOptions(newPrice, shop)
                    .then(result=>{
                        return {
                            items: [{
                            id: result.body.product.variants[0].id,
                            quantity: 1,
                            title: `Cushion with custom options`,
                            properties: {
                                shape,
                                fabric,
                                fill,
                                welting,
                                ties,
                                thickness,
                                depth,
                                width
                            }
                            }]
                        }
                    })
                    .catch(error => {
                        throw Error (error);
                    })
                
                response.status = true;
                response.result = create_product_result;

            } catch (error) {
                console.log(error)
                response.error = error.message
            }

            return response
        }

        let to_be_stored_function = generate_function.toString();
        to_be_stored_function = to_be_stored_function.substring(to_be_stored_function.indexOf("{") + 1, to_be_stored_function.lastIndexOf("}"));
        let JSON_function = {function: ['params', to_be_stored_function]}

        let data = await query('INSERT INTO product_custom_options (shop_id, product_function, product_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)', 
                            [store_data.id, JSON.stringify(JSON_function), params.product_id, new Date(), new Date()])
        console.log(data)
    }

    generateCustomProduct = async (params) => {
        let [store_data] = await this.fetchAccessToken(params.body.shop);
        let [stored_function] = await this.fetchFunction(store_data.id, params.body.product_id)
        let function_json = JSON.parse(stored_function.product_function);
        let product_function = Function(function_json.function[0], function_json.function[1])
        
        params.createProductOptions = this.createProductOptions;
                
        return await product_function(params)
    }
}

export default ShopModel;