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

        }
        catch (err) {
            console.error(`Error in ThreadDAO getThreadByThreadId: ${err}`);
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
            console.error(`Error in ThreadDAO getThreadByTextAndDeletepassword: ${err}`);
        }
    }

    async getThreadByBoardSortDescByBumpDate(board) {
        try {
            const result = await ThreadModel.find({ board })
            .limit(10)
            .sort({ bumped_on: -1 }).select('-reported -delete_password');
            return result;
        }
        catch (err) {
            console.error(`Error in ThreadDAO getThreadByTextAndDeletepassword: ${err}`);
        }
    }


    async updateThread(thread_id) {
        try {

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