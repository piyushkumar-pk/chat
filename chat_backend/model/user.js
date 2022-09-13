const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ""
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);