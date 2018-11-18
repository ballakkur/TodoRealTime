const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let subSchema = new Schema({
  parentId:{
    type:String,
    required:true
  },
  subItemId:{
    type:String,
    required:true,
  },
  itemName:{
      type:String
  },
  createdOn : {
      type : Date,
      default : Date.now()
  },
})

mongoose.model('SubItem', subSchema);