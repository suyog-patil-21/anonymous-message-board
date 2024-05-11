const ThreadDAO = require('../data/thread-data');

module.exports = class ThreadService {
    constructor() {
        this.threadDAO = new ThreadDAO();
    }

    async createThread(board,text, delete_password) {
        try {
            const result = await this.threadDAO.createThread(board,text, delete_password);
            if (result === undefined || result === null) {
                return false;
            }
            return true;
        }
        catch (err) {
            console.error(`Error in ThreadService createThread: ${err}`);
        }
    }

    async addReplietoThread(thread_id,text,delete_password){
        try {
            const result = await this.threadDAO.updateThreadById(thread_id,{
                bumped_on:Date.now(),
                $push : {replies: {
                    text,
                    delete_password,
                }}
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

    async getThreadWithRepliesBythreadId(thread_id){
        try {
            const result = await this.threadDAO.getThreadByThreadIdWithoutPasswordAndReported(thread_id);
           return result;
        }
        catch (err) {
            console.error(`Error in ThreadService getThreadWithRepliesBythreadId: ${err}`);
        }
    }

    async getMostRecentThreadsWithReplies(board){
        try {
            const result = await this.threadDAO.getThreadByBoardSortDescByBumpDate(board);
            return result;
        }
        catch (err) {
            console.error(`Error in ThreadService getMostRecentThreadsWithReplies: ${err}`);
        } 
    }
}