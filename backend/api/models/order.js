const mongoose = require('mongoose');
//const Schema = mongoose.Schmea; 'sama aja kek yang di bawah'
const { Schema } = mongoose;

const orderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    nama: { type: String, required: true },
    email: { type: String, required: true },
    telp: { type: Number, required: true },
    catatan: { type: String },
    alamat: { type: String, required: true },
    tglPesanan: { type: Date, required: true },
    tglMemesan: { type: Date, required: true }
    // quantity : {type : Number, default : 1}
});

// model class dengan nama product
module.exports = mongoose.model('Order', orderSchema);

