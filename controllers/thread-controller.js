const ThreadService = require('../service/thread-service');

const threadService = new ThreadService(); 

const createThread = async (req,res) => {
 const {text ,delete_password} = req.body;
    const result = await threadService.createThread(text,delete_password);
    if(result == true){
        res.status(200).send();
    }
    return res.status(500).send();;
}

module.exports = {
    createThread
}