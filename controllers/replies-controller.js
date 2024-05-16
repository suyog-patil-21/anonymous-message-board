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
    const result = await threadService.deleteThreadReplyByThreadIdAndReplyIdAndReplyPassword(thread_id, reply_id, delete_password);
    if (result == null || result == undefined) {
        return res.status(500).send();
    }
    if(result.modifiedCount == 1  && result.matchedCount == 1){
        return res.status(200).send('success');
    }
    return res.status(200).send('incorrect password');
}

const reportThreadReplyHandler = async (req, res) => {
    const { thread_id, reply_id } = req.body;
    const result = await threadService.reportThreadReplyByThreadIdAndReplyId(thread_id, reply_id);
    if (result != true) {
        return res.status(500).send();
    }
    return res.status(200).send('reported');
}

module.exports = {
    createRepliesHandler,
    deleteReplyHandler,
    reportThreadReplyHandler
};