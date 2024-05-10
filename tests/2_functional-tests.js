const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const ThreadDAO = require('../data/thread-dao')

chai.use(chaiHttp);

suite('Functional Tests', function () {
    const threadDAO = new ThreadDAO();
    
    suiteTeardown(async function () {
        await threadDAO.deleteAllThreads();
    });

    test('Creating a new thread: POST request to /api/threads/{board}', async function () {
        const text = 'Testing this text';
        const delete_password = 'password';
        const response = await chai.request(server).post('/api/threads/GameThread').send({
            text,
            delete_password
        });
        chai.expect(response.statusCode).to.equal(200);
        const result = await threadDAO.getThreadByTextAndDeletepassword(text, delete_password);
        chai.expect(result).to.have.property('_id');
        chai.expect(result).to.have.property('created_on');
        chai.expect(result).to.have.property('bumped_on');
        chai.expect(result).to.have.property('reported');
        chai.expect(result).to.have.property('delete_password');
        chai.expect(result).to.have.property('replies');
        chai.expect(result['created_on']).to.be.an.instanceOf(Date);
        chai.expect(result['created_on']).to.be.an.instanceOf(Date);
        chai.assert.isBoolean(result['reported']);
        chai.assert.isArray(result['replies'])
    });

});
