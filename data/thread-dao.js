const { ThreadModel } = require('../model/thread-schema');

module.exports = class ThreadDAO {

    async createThread(text, delete_password) {
        try {
            const newThread = ThreadModel({ text, delete_password });
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

    async getThreadByTextAndDeletepassword(text, delete_password) {
        try {
            const result = await ThreadModel.findOne({
                text, delete_password
            }).exec();
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

    async deleteAllThreads(thread_id) {
        try {
            await ThreadModel.deleteMany({});
        }
        catch (err) {
            console.error(`Error in ThreadDAO deleteAllThreads: ${err}`);
        }
    }
}