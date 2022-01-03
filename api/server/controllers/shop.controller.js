import ShopsModel from "../model/shops.model";

class ShopController{
    constructor(){
    }

    createProductOptions = async (req, res) => {
        try {
            let shopsModel = new ShopsModel();
            let data = await shopsModel.createProductOptions(req.body)

            res.json(data)
        } catch (error) {
            console.log(error.message)
        }
    }
    
    registerShop = async (req, res) => {
        let shopsModel = new ShopsModel();
        let result = await shopsModel.registerShop(req.body)
        
        res.end()
    };

    createProductCustomOptions = async (req, res) => {
        try {
            let shopsModel = new ShopsModel();
            let data = await shopsModel.createProductCustomOptions(req.body)

            res.json(data)
        } catch (error) {
            console.log(error.message)
        }
        res.end();
    }

    generateCustomProduct = async (req, res) => {
        try {
            let shopsModel = new ShopsModel();
            let data = await shopsModel.generateCustomProduct(req)

            res.json(data)
        } catch (error) {
            console.log(error)
        }
        res.end();
    }
}
export default (function shop(){
    return new ShopController();
})();