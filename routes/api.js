'use strict';
const threadController = require('../controllers/thread-controller');
const repliesController = require('../controllers/replies-controller');

module.exports = function (app) {

  app.route('/api/threads/:board')
    .get(threadController.getThreadsHandler)
    .post(threadController.createThreadHandler)
    .delete(threadController.deleteThreadHandler);

  app.route('/api/replies/:board')
    .get(threadController.getThreadsWithAllRepliesHandler)
    .post(repliesController.createRepliesHandler);

};
