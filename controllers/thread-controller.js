const {request, response} = require('express');
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
    const result = await threadService.getMostRecentThreadsWithReplies(board);
    if (result === undefined) {
        return res.status(500).send();
    }
    return res.status(200).send(result);
};

const getThreadsWithAllRepliesHandler = async (req, res) => {
    const { thread_id } = req.query;
    const result = await threadService.getThreadWithRepliesBythreadId(thread_id);
    if (result === undefined) {
        return res.status(500).send();
    }
    return res.status(200).send(result);
}

module.exports = {
    createThreadHandler,
    getThreadsHandler,
    getThreadsWithAllRepliesHandler
};