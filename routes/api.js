'use strict';
const threadController = require('../controllers/thread-controller');
const repliesController = require('../controllers/replies-controller');

module.exports = function (app) {

  app.route('/api/threads/:board')
    .get(threadController.getThreadsHandler)
    .post(threadController.createThreadHandler)
    .put(threadController.reportThreadHandler)
    .delete(threadController.deleteThreadHandler);

  app.route('/api/replies/:board')
    .get(threadController.getThreadsWithAllRepliesHandler)
    .post(repliesController.createRepliesHandler)
    .put(repliesController.reportThreadReplyHandler)
    .delete(repliesController.deleteReplyHandler);

};
