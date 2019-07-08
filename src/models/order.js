const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  creationDate: {
    type: Date,
    default: Date.now
  },
  closedDate: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: true,
    default: 'Open'
  },
  items : [
    {
      product: {
        type: Schema.Types.ObjectId
      },
      quantity: Number
    }
  ],
  total: {
    type: Number,
    default: 0
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);
