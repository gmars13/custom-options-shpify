import ShopsModel from "../model/shops.model";

class ShopController{
    constructor(){
    }

    createProductOptions = async (req, res) => {
        let shopsModel = new ShopsModel();
        let data = await shopsModel.createProductOptions(req.body)

        res.json(data)
    }
    
    registerShop = async (req, res) => {
        let shopsModel = new ShopsModel();
        let result = await shopsModel.registerShop(req.body)
        
        res.end()
    }
}
export default (function shop(){
    return new ShopController();
})();