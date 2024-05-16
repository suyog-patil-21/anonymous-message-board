const ThreadService = require('../service/thread-service');

const threadService = new ThreadService();

const createRepliesHandler = async (req, res) => {
    const board = req.params.board;
    const { thread_id, text, delete_password } = req.body;
    const result = await threadService.addReplietoThread(thread_id, text, delete_password);
    if (result == true) {
        return res.status(200).send();
    }
    return res.status(500).send();
};

const deleteReplyHandler = async (req, res) => {
    const { thread_id, reply_id, delete_password } = req.body;
    // TODO : write code for delete reply
}

const reportThreadReplyHandler = async (req, res) => {
    const { thread_id, reply_id } = req.body;
    // TODO : write code for report reply of the thread
}

module.exports = {
    createRepliesHandler,
    deleteReplyHandler,
    reportThreadReplyHandler
};