'use strict';
const threadController = require('../controllers/thread-controller');

module.exports = function (app) {

  app.route('/api/threads/:board')
    .get(threadController.getThreadsHandler)
    .post(threadController.createThreadHandler);

  app.route('/api/replies/:board');

};
