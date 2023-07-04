const Product = require('../model/Product')

const getProducts = async (req, res) => {
    try {
        const queryObject = {}
        const {name, category, quality, sort} = req.query
        
        if(name){
            queryObject.name = { $regex: name, $options: 'i' };
        }
        if(category){
            queryObject.category = category
        }
        if(quality){
            queryObject.quality = quality
        }

        let products = Product.find(queryObject)
        
        if(sort){
            const sortList = sort.split(',').join(' ')
            products = products.sort(sortList)
        }

        products = await products
        res.status(200).json({products, nbits: products.length})
        
    } catch (error) {
        console.log(error);
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const {id: productId} = req.params
        const product = await Product.findOne({_id: productId})
        res.status(200).json({product})
    } catch (error) {
        res.status(404).json({msg: 'Something wrong here!!!'})
    }
}

module.exports = {
    getSingleProduct,
    getProducts
}