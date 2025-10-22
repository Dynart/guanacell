const mongoose = require ('mongoose');

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: String,
        default: 'admin'
    }
}, {
    timestamps: true


});

module.exports = mongoose.model('Todo', todoSchema);