'use strict';
const threadController = require('../controllers/thread-controller');

module.exports = function (app) {

  app.route('/api/threads/:board')
    .post(threadController.createThread);

  app.route('/api/replies/:board');

};
