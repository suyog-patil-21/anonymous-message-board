const mongoose = require('mongoose');

const RepliesSchema = new mongoose.Schema({
    text: {
        type: mongoose.SchemaTypes.String,
        required: true
    }, created_on: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now
    }, delete_password: {
        type: mongoose.SchemaTypes.String,
        required: true
    }, reported: {
        type: mongoose.SchemaTypes.Boolean,
    },
});

const ThreadSchema = new mongoose.Schema(
    {   
        board: {
            type: mongoose.SchemaTypes.String,
            required:true,
        },
        text: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        delete_password: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        created_on: {
            type: mongoose.SchemaTypes.Date,
            default: Date.now
        },
        bumped_on: {
            type: mongoose.SchemaTypes.Date
            , default: Date.now
        },
        reported: {
            type: mongoose.SchemaTypes.Boolean,
            default:false
        },
        replies: {
            type: [RepliesSchema],
        }
    });

const ThreadModel = mongoose.model('Thread', ThreadSchema);

module.exports = {
    ThreadModel
}