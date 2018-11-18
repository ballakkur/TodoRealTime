const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  itemId: {
    type: String,
    index:true,
    unique:true,
    required : true
  },
  parentId:{
    type:String,
    required:true
  },
  isDone:{
    type:Boolean,
    default:false
  },
  itemName:{
      type:String
  },
  createdOn : {
      type : Date,
      default : Date.now()
  },
})

mongoose.model('Item', itemSchema);