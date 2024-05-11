const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const ThreadDAO = require('../data/thread-data')

chai.use(chaiHttp);

suite('Functional Tests', function () {
    const threadDAO = new ThreadDAO();

    const board = 'testingBoard';

    // suiteTeardown(async function () {
    //     await threadDAO.deleteAllThreadsByBoard(board);
    // });

    test('Creating a new thread: POST request to /api/threads/{board}', async function () {
        const text = 'Testing this text';
        const delete_password = 'password';
        const response = await chai.request(server).post(`/api/threads/${board}`).send({
            text,
            delete_password
        });
        chai.expect(response.statusCode).to.equal(200);
        const result = await threadDAO.getThreadByBoardTextAndDeletepassword(board, text, delete_password);
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
        chai.assert.isArray(result['replies'])
    });

    test('Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}', async function () {
        const response = await chai.request(server).get(`/api/threads/${board}`);
        chai.expect(response.statusCode).to.equal(200);
        chai.assert.isArray(response.body);
        chai.assert.isAtMost(response.body.length, 10);
        chai.expect(response.body[0]).to.not.have.property('reported');
        chai.expect(response.body[0]).to.not.have.property('delete_password');
        chai.expect(response.body[0]).to.have.property('_id');
        chai.expect(response.body[0]).to.have.property('created_on');
        chai.expect(response.body[0]).to.have.property('bumped_on');
        chai.expect(response.body[0]).to.have.property('replies');
        chai.assert.isAtMost(response.body[0]['replies'].length, 10);
    });
});
