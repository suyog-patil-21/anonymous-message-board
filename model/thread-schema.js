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
        created_on: {
            type: mongoose.SchemaTypes.Date,
            default: Date.now
        },
        text: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        bumped_on: {
            type: mongoose.SchemaTypes.Date
            , default: Date.now
        },
        reported: {
            type: mongoose.SchemaTypes.Boolean,
            default:false
        },
        delete_password: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        replies: {
            type: [RepliesSchema],
        }
    });

const ThreadModel = mongoose.model('Thread', ThreadSchema);

module.exports = {
    ThreadModel
}