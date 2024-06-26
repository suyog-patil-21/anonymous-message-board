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

    async getThreadWithRepliesBythreadId(thread_id, showPasswordAndReported) {
        try {
            const sendPassword = showPasswordAndReported || false;
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

    async reportThreadById(thread_id) {
        try {
            const result = await this.threadDAO.updateThreadById(thread_id, {
                reported: true
            })
            return result;
        }
        catch (err) {
            console.error(`Error in ThreadService deleteThreadById: ${err}`);
        }
    }


    async reportThreadReplyByThreadIdAndReplyId(thread_id, reply_id) {
        try {
            const result = await this.threadDAO.updateThread(
                {
                    _id: thread_id,
                    "replies._id": reply_id
                },
                {
                    "replies.$.reported": true
                });
            if (result === undefined || result == null || result.modifiedCount == 0) return false;
            return true;
        }
        catch (err) {
            console.error(`Error in ThreadService reportThreadReplyByThreadIdAndReplyId: ${err}`);
        }
    }


    async deleteThreadReplyByThreadIdAndReplyIdAndReplyPassword(thread_id, reply_id, reply_password) {
        try {
            const result = await this.threadDAO.updateThread(
                {
                    _id: thread_id,
                    "replies._id": reply_id,
                    "replies.delete_password": reply_password
                },
                {
                    "replies.$.text": "[deleted]"
                });
          return result;
        }
        catch (err) {
            console.error(`Error in ThreadService deleteThreadReplyByThreadIdAndReplyIdAndReplyPassword: ${err}`);
        }
    }
}