const mongoose = require('mongoose')
const Schema = mongoose.Schema

const friendRequestSchema = new Schema({
    senderId: {
        type: String
    },
    recipientId: {
        type: String
    },
    requestStatus: {
        type: String,
        enum: ['requested', 'accepted'],
        required: true
    }

})
mongoose.model('Friendreq', friendRequestSchema)