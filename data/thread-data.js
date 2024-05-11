const { ThreadModel } = require('../model/thread-schema');

module.exports = class ThreadDAO {

    async createThread(board, text, delete_password) {
        try {
            const newThread = ThreadModel({ board, text, delete_password });
            return await newThread.save();
        }
        catch (err) {
            console.error(`Error in ThreadDAO createThread: ${err}`);
        }
    }

    async getThreadByThreadId(thread_id) {
        try {
            const result = await ThreadModel.findOne({
                _id: thread_id
            }).exec();
            return result;
        }
        catch (err) {
            console.error(`Error in ThreadDAO getThreadByThreadId: ${err}`);
        }
    }

    async getThreadByThreadIdWithoutPasswordAndReported(thread_id) {
        try {
            const result = await ThreadModel.findOne({ _id: thread_id })
                .select('-delete_password -reported -replies.delete_password -replies.reported').exec();
            return result;
        }
        catch (err) {
            console.error(`Error in ThreadDAO getThreadByThreadIdWithoutPasswordAndReported: ${err}`);
        }
    }

    async getThreadByBoardTextAndDeletepassword(board, text, delete_password) {
        try {
            const result = await ThreadModel.findOne({
                board,
                text, delete_password
            }).exec();
            return result;
        }
        catch (err) {
            console.error(`Error in ThreadDAO getThreadByBoardTextAndDeletepassword: ${err}`);
        }
    }

    async getThreadByBoardSortDescByBumpDate(board) {
        try {// FIXME : fix this method
            const result = await ThreadModel.find({ board })
                .sort({
                    'replies.created_on':-1,
                    bumped_on: -1,
                })
                .limit(10)
                .populate({
                    path: 'replies',
                    sort: { 'replies.created_on': -11 },
                    limit: {'replies':3}
                })
                .select('-reported -delete_password -replies.reported -replies.delete_password');
            console.log(`DATA  = check : ${result}`);
            console.log(`DATA.length: ${result.length}`);
            
            return result;
        }
        catch (err) {
            console.error(`Error in ThreadDAO getThreadByBoardSortDescByBumpDate: ${err}`);
        }
    }


    async updateThreadById(thread_id, updateObject) {
        try {
            const result = await ThreadModel.findByIdAndUpdate(thread_id, updateObject);
            return result;
        }
        catch (err) {
            console.error(`Error in ThreadDAO updateThread: ${err}`);
        }
    }

    async deleteAllThreadsByBoard(board) {
        try {
            await ThreadModel.deleteMany({ board });
        }
        catch (err) {
            console.error(`Error in ThreadDAO deleteAllThreadsByBoard: ${err}`);
        }
    }
}