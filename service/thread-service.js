const ThreadDAO = require('../data/thread-dao');

module.exports = class ThreadService {
    constructor() {
        this.threadDAO = new ThreadDAO();
    }

    async createThread(text, delete_passpword) {
        try {
            const result = await this.threadDAO.createThread(text, delete_passpword);
            if (result === undefined || result === null) {
                return false;
            }
            return true;
        }
        catch (err) {
            console.error(`Error in ThreadService createThread: ${err}`);
        }
    }
}