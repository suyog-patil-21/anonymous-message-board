const { request, response } = require('express');
const ThreadService = require('../service/thread-service');

const threadService = new ThreadService();

const createThreadHandler = async (req, res) => {
    const { text, delete_password } = req.body;
    const board = req.params.board;
    const result = await threadService.createThread(board, text, delete_password);
    if (result == true) {
        res.status(200).send();
    }
    return res.status(500).send();
}

const getThreadsHandler = async (req, res) => {
    const board = req.params.board;
    const result = await threadService.getMostRecentThreadsWithRecent3Replies(board);
    if (result === undefined || result == null) {
        return res.status(500).send();
    }
    return res.status(200).send(result);
};

const getThreadsWithAllRepliesHandler = async (req, res) => {
    const { thread_id } = req.query;
    const result = await threadService.getThreadWithRepliesBythreadId(thread_id, false);
    if (result === undefined || result == null) {
        return res.status(500).send();
    }
    return res.status(200).send(result);
}

const deleteThreadHandler = async (req, res) => {
    const board = req.params.board;
    const { thread_id, delete_password } = req.body;
    const result = await threadService.getThreadWithRepliesBythreadId(thread_id, true);

    if (result === undefined || result == null) {
        return res.status(500).send();
    }
    if (result.delete_password == delete_password && result.board == board) {
        const ans = await threadService.deleteThreadById(thread_id);
        if (ans) {
            return res.status(200).send('success');
        }
        return res.status(500).send();
    }
    return res.status(200).send('incorrect password');
}

const reportThreadHandler = async (req, res) => {
    const { thread_id } = req.body;
    const result = await threadService.reportThreadById(thread_id);
    console.log(result);
    if (result == null || result == undefined) {
        return res.status(500).send();
    }
    return res.status(200).send('reported');
}

module.exports = {
    createThreadHandler,
    getThreadsHandler,
    getThreadsWithAllRepliesHandler,
    deleteThreadHandler,
    reportThreadHandler
};