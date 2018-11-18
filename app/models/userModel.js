const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        min: 2,
        required: true
    },
    mobile: {
        type: Number,
        min: 1111111111,
        max: 9999999999,
        required: true
    },
     friends:[{
         userId: String,
         userName : String
     }],
    //  friends:[String],
    active: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('User', userSchema);