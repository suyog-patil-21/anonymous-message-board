const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const ThreadDAO = require('../data/thread-data')

chai.use(chaiHttp);

suite('Functional Tests', function () {
    const threadDAO = new ThreadDAO();

    const board = 'testingBoard';
    const threadText = 'Testing -> thread text';
    const replyText = 'Testing -> reply text';
    const delete_password = 'password';

    // suiteTeardown(async function () {
    //     await threadDAO.deleteAllThreadsByBoard(board);
    // });

    test('Creating a new thread: POST request to /api/threads/{board}', async function () {
        const response = await chai.request(server).post(`/api/threads/${board}`).send({
            text: threadText,
            delete_password
        });
        chai.expect(response.statusCode).to.equal(200);
        const result = await threadDAO.getThreadByBoardTextAndDeletepassword(board, threadText, delete_password);
        chai.expect(result).to.have.property('board');
        chai.expect(result).to.have.property('_id');
        chai.expect(result).to.have.property('created_on');
        chai.expect(result).to.have.property('bumped_on');
        chai.expect(result).to.have.property('reported');
        chai.expect(result).to.have.property('delete_password');
        chai.expect(result).to.have.property('replies');
        chai.expect(result['created_on']).to.be.an.instanceOf(Date);
        chai.expect(result['bumped_on']).to.be.an.instanceOf(Date);
        chai.expect(result['board']).to.equal(board);
        chai.assert.isBoolean(result['reported']);
        chai.assert.isArray(result['replies'])
    });

    test('Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}', async function () {
        const response = await chai.request(server).get(`/api/threads/${board}`);
        chai.expect(response.statusCode).to.equal(200);
        chai.assert.isArray(response.body);
        chai.expect(response.body).to.have.length.lessThan(11); // must contain only 10
        chai.expect(response.body[0]).to.not.have.property('reported');
        chai.expect(response.body[0]).to.not.have.property('delete_password');
        chai.expect(response.body[0]).to.have.property('_id');
        chai.expect(response.body[0]).to.have.property('created_on');
        chai.expect(response.body[0]).to.have.property('bumped_on');
        chai.expect(response.body[0]).to.have.property('replies');
        chai.expect(response.body[0]['board']).to.equal(board);
        chai.expect(response.body[0]['replies']).to.have.length.lessThan(4); // must contain only 3
        chai.expect(response.body[0]['replies'][0]).to.have.property('text');
        chai.expect(response.body[0]['replies'][0]).to.have.property('_id');
        chai.expect(response.body[0]['replies'][0]).to.not.have.property('created_on');
        chai.expect(response.body[0]['replies'][0]).to.not.have.property('reported');
        chai.expect(response.body[0]['replies'][0]).to.not.have.property('delete_password');
    });

    test('Creating a new reply: POST request to /api/replies/{board}', async function () {
        const oldThreatResult = await threadDAO.getThreadByBoardTextAndDeletepassword(board, threadText, delete_password);

        const response = await chai.request(server).post(`/api/replies/${board}`).send({
            thread_id: oldThreatResult._id,
            text: replyText,
            delete_password
        });

        chai.expect(response.statusCode).to.equal(200);

        const result = await threadDAO.getThreadByThreadId(oldThreatResult._id);
        chai.expect(result).to.have.property('board');
        chai.expect(result).to.have.property('_id');
        chai.expect(result).to.have.property('created_on');
        chai.expect(result).to.have.property('bumped_on');
        chai.expect(result).to.have.property('reported');
        chai.expect(result).to.have.property('delete_password');
        chai.expect(result).to.have.property('replies');
        chai.expect(result['created_on']).to.be.an.instanceOf(Date);
        chai.expect(result['bumped_on']).to.be.an.instanceOf(Date);
        chai.assert.isBoolean(result['reported']);
        chai.assert.isArray(result['replies']);
        chai.expect(result['board']).to.equal(board);
        chai.expect(result['bumped_on']).to.be.greaterThan(result['created_on']);
        chai.expect(result['replies'][0]).to.have.property('_id');
        chai.expect(result['replies'][0]).to.have.property('text');
        chai.expect(result['replies'][0]).to.have.property('created_on');
        chai.expect(result['replies'][0]).to.have.property('delete_password');
        chai.expect(result['replies'][0]).to.have.property('reported');
    });


    test('Viewing a single thread with all replies: GET request to /api/replies/{board}', async function () {
        const oldThreatResult = await threadDAO.getThreadByBoardTextAndDeletepassword(board, threadText, delete_password);
        const thread_id = oldThreatResult._id.toString();

        const response = await chai.request(server).get(`/api/replies/${board}`).query({
            thread_id,
        });

        chai.expect(response.statusCode).to.equal(200);
        chai.expect(response.body).to.have.property('board');
        chai.expect(response.body).to.have.property('_id');
        chai.expect(response.body).to.have.property('created_on');
        chai.expect(response.body).to.have.property('bumped_on');
        chai.expect(response.body).to.not.have.property('reported');
        chai.expect(response.body).to.not.have.property('delete_password');
        chai.expect(response.body).to.have.property('replies');
        chai.assert.isArray(response.body['replies']);
        chai.expect(response.body['board']).to.equal(board);
        chai.expect(Date.parse(response.body['bumped_on'])).to.be.greaterThan(Date.parse(response.body['created_on']));
        chai.expect(response.body['replies'][0]).to.have.property('_id');
        chai.expect(response.body['replies'][0]).to.have.property('text');
        chai.expect(response.body['replies'][0]).to.have.property('created_on');
        chai.expect(response.body['replies'][0]).to.not.have.property('delete_password');
        chai.expect(response.body['replies'][0]).to.not.have.property('reported');
    });
});
