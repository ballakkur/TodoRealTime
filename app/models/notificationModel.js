const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    notiId: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
   text:{
    type:String,
    required:true
   },
   concernId:{
       type:String,
   },
    createdOn: {
        type: Date,
        default: Date.now()
    }
})
mongoose.model('Notification', notificationSchema)