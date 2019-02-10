const Order = require('../models/order');
const mongoose = require('mongoose');
const Product = require('../models/product');

exports.order_get_all = (req, res, next) => {
  Order.find()
    .select("product nama alamat email telp catatan tglPesanan tglMemsan")
    .populate("product", "name")
    .exec()
    .then(docs => {
      console.log(docs);
      // another way for get response from variabel
      const response = {
        count: docs.length,
        //map method for recieves argument from callback
        Order: docs.map(docs => {
          //return value use json
          return {
            _id: docs._id,
            product: docs.product,
            nama: docs.nama,
            alamat: docs.alamat,
            email: docs.email,
            telp: docs.telp,
            catatan: docs.catatan,
            tglPesanan : docs.tglPesanan,
            tglMemesan : docs.tglMemesan,
            // the rules you must add request object after response to next step
            request: {
              type: 'GET',
              url: 'localhost:3000/products/' + docs._id
            }
          }
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err)
      res.status(200).json({
        message: err
      });
    });
}

exports.order_post_all = (req, res, next) => {
  const { productId, nama, email, alamat, telp, catatan, tglPesanan, tglMemesan } = req.body;
  Product.findById(productId)
    //if productId inside the product. save data in db
    // if nothing throw in catch
    .then(product => {
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: productId,
        nama: nama,
        email: email,
        alamat: alamat,
        telp: telp,
        catatan: catatan,
        tglPesanan : tglPesanan,
        tglMemesan : tglMemesan,
      });
      return order.save()
    })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'adding order successfull',
        createdOrder: {
          _id: result._id,
          product: result.product,
          nama : result.nama,
          request: {
            type: 'GET',
            url: 'localhost:3000/orders/' + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        message: "Product with id " + req.body.productId + " is not found",
        error: err
      });
    });
}

exports.order_delete_orderId = (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
    .exec()
    .then(result => {
      console.log(result),
        res.status(200).json({
          message: "Order remove successfull",
          OrderId: id,
          request: {
            type: "GET",
            url: "localhost:3000/orders/",
          }
        });
    })
    .catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        })
    });
}

exports.order_get_orderId = (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .select("product quantity _id")
    .populate("product", "name price")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          Order: doc,
          request: {
            type: "GET",
            url: "localhost:3000/orders"
          }
        })
      } else {
        res.status(404).json({
          message: "Order not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}