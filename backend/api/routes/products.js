const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const ProducstController = require ('../controllers/products');

//upload image
const multer = require('multer');
//storage strategy is step for store file
const storage = multer.diskStorage({
    //two properties have a function for process file
    //funtion(where incoming file should be stored and we get access to the file at your callback)
    destination: (req,file,callback)=>{
        //callback(potential error,path for stored file)
        callback(null,'./uploads/');
    },
    filename: (req,file,callback)=>{
        //callback(potential error, name file up2you)
        // callback(null,new Date().toLocaleDateString() + file.originalname);
        callback(null,new Date().getTime() + file.originalname);
        console.log(req.file);
    }
});
// for file filter
const fileFilter = (req,file,callback)=>{
    // mimetype is type of file
    if (file.mimetype === 'image/jpeg'||file.mimetype === 'image/png'){
        callback(null, true);
    }else{
        callback(null, false);
    }
};
// limit size image
const limits = ({
    limits :{
        fileSize: 1024 *1024*5
    }
});
//save image from variabel storage that have storage strategy
const upload = multer({
    storage:storage,
 //   fileFilter : fileFilter,
  //  limits : limits
});

// upload.single('productImage') untuk di selipkan di post "/" setelah check auth
router.get('/', ProducstController.product_get_all);
router.post('/',checkAuth,upload.single('productImage'),ProducstController.product_post);
router.delete('/:productId',checkAuth,ProducstController.product_delete_productId);
router.get('/:productId',checkAuth, ProducstController.product_get_productId);
router.patch('/:productId',checkAuth,upload.single('productImage'),ProducstController.product_patch_productId);

module.exports = router;