const mongoose = require('mongoose');
const Product = require('../models/product');

exports.product_get_all = (req, res, next) => {
    Product.find()
    .select("name price _id productImage itemFood")
    .exec()
    .then(docs =>{
    console.log(docs);
    // another way for get response from variabel
       const response = {
           count : docs.length,
           //map method for recieves argument from callback
           product : docs.map(docs =>{
               //return value use json
               return{
                   name : docs.name,
                   price : docs.price,
                   productImage : docs.productImage,
                   itemFood : docs.itemFood,
                   _id : docs._id,
                   // the rules you must add request object after response to next step
                   request:{
                       type : 'GET',
                       url : 'localhost:3000/products/'+ docs._id
                   }
               }
           })
       }; 
       res.status(200).json(response);
    })
    .catch(err=>{
        console.log(err)
    });
}

exports.product_post = (req, res, next) => {
    //cek what object is available?
    console.log(req.body);
    const product= new Product({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        price : req.body.price,
        itemFood : req.body.itemFood,
        productImage : req.file.path
    });
    //save data in database
    //catch error
    product.save()
    .then(result =>{
        console.log(result),
        res.status(200).json({
            message:'adding docs successfull',
            newProduct: {
                name : result.name,
                price : result.price,
                itemFood : result.itemFood,
                productImage : result.productImage,
                _id : result._id,
                request:{
                    type : 'GET',
                    url : 'localhost:3000/products/'+ result._id
                }
            }
        });
    })
    .catch(err =>{
        res.status(500).json({
            error :err
        });
    });
}

exports.product_delete_productId = (req, res, next)=>{
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result =>{
        console.log("result delete ",result),
        res.status(200).json({
            message:"Success remove collection",
            product: "id deleted "+ id,
            request:{
                type : 'GET',
                url : 'localhost:3000/products/',
                body:{name : 'String', price : 'number'}
            }
        });
    })
    .catch(err =>{
        console.log("Error delete ",err),
        res.status(500).json({
            error :err
        });
    });
}

exports.product_get_productId = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then(doc =>{
        if (doc){
            res.status(200).json({
                product : doc,
                request : {
                    type : "GET",
                    url : 'localhost:3000/products/'
                }
            });
        }else{
            res.status(404).json({
                message : "Product not found"
            });
        }
    })
    .catch(err =>{
        console.log(err),
        res.status(500).json({error:err})
    });
}

exports.product_patch_productId = (req, res, next)=>{
    const id = req.params.productId;
    // old style
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newItemFood = req.body.itemFood;
    const newProductImage = req.file.path;
    
    Product.update({_id : id},{$set:{name : newName, price : newPrice, itemFood:newItemFood, productImage : newProductImage}})
    // new style (jatoh nya lebih fleksibel dalam menentukan data mana yang ingin di update) 
    // provide empty Object
    // const updateOperation = {}; 
    // get all of body whose have name of body save in propName
    // for(const operation of req.body){
    //     updateOperation[operation.propName] = operation.value;
    // }
    // Product.update({_id : id},{$set : updateOperation})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            result :result,
            message : 'new Product Update',
            request : {
                type: 'GET',
                url : 'localhost:3000/products/' + id
            }
        });
    })
    .catch(err=>{
        console.log(err),
        res.status(500).json({
            error :err
        });
    });
}