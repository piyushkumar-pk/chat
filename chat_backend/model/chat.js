const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);