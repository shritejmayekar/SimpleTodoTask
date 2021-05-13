const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({

    content:{
        type: 'string',
        required: true
    },
    date:{
        type: 'date',
        default: Date.now()
    }
})


module.exports = mongoose.model('TodoTask',todoSchema)