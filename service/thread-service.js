const ThreadDAO = require('../data/thread-data');

module.exports = class ThreadService {
    constructor() {
        this.threadDAO = new ThreadDAO();
    }

    async createThread(board, text, delete_password) {
        try {
            const result = await this.threadDAO.createThread(board, text, delete_password);
            if (result === undefined || result === null) {
                return false;
            }
            return true;
        }
        catch (err) {
            console.error(`Error in ThreadService createThread: ${err}`);
        }
    }

    async addReplietoThread(thread_id, text, delete_password) {
        try {
            const currentDate = Date.now();
            const result = await this.threadDAO.updateThreadById(thread_id, {
                bumped_on: currentDate,
                $push: {
                    replies: {
                        text,
                        delete_password,
                        created_on: currentDate
                    }
                }
            });
            if (result === undefined || result === null) {
                return false;
            }
            return true;
        }
        catch (err) {
            console.error(`Error in ThreadService addReplietoThread: ${err}`);
        }
    }

    async getThreadWithRepliesBythreadId(thread_id, showPassword) {
        try {
            const sendPassword = showPassword || false;
            if (sendPassword) {
                return await this.threadDAO.getOneThreadByThreadId(thread_id);
            }
            return await this.threadDAO.getOneThreadByThreadIdWithoutPasswordAndReported(thread_id);
        }
        catch (err) {
            console.error(`Error in ThreadService getThreadWithRepliesBythreadId: ${err}`);
        }
    }

    async getMostRecentThreadsWithRecent3Replies(board) {
        try {
            const result = await this.threadDAO.getThreadByBoardSortDescByBumpDate(board);
            return result;
        }
        catch (err) {
            console.error(`Error in ThreadService getMostRecentThreadsWithRecent3Replies: ${err}`);
        }
    }

    async deleteThreadById(thread_id) {
        try {
            const result = await this.threadDAO.deleteThreadByThreadId(thread_id);
            return result.acknowledged;
        }
        catch (err) {
            console.error(`Error in ThreadService deleteThreadById: ${err}`);
        }
    }
}