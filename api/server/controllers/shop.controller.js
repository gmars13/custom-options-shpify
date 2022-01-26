import ShopsModel from "../model/shops.model";

class ShopController{
    constructor(){
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

    calculatePriceSeatCushions = async (req, res) => {
        try {
            let shopsModel = new ShopsModel();
            let data = await shopsModel.calculatePriceSeatCushions(req)

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