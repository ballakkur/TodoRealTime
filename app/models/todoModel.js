const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  listId: {
    type: String,
    index:true,
    unique:true,
    required : true
  },
  listName: {
    type: String,
    default:'new Todo',
    required: true
  },
  item: [String],

  creatorId : {
      type : String,
      required : true
  },
  isPrivate:{
      type:Boolean,
      default:true
  },
  createdOn : {
      type : Date,
      default : Date.now()
  },
})

mongoose.model('List', todoSchema);