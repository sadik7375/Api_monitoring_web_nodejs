const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    callback(200, {
        messsage: 'This a sample url',
    });

}

module.exports = handler;