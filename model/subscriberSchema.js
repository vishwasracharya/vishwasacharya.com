const mongoose = require('mongoose');
const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true
        // match: [
        //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        //     'Please fill a valid email address'
        // ]
    }
})
const Subscriber = mongoose.model('SUBSCRIBER', subscriberSchema);
module.exports = Subscriber;