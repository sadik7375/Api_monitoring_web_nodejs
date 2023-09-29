const { StringDecoder } = require('string_decoder'); //decode buffer to string
const url = require('url');
const routes = require('../routes');

const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');

const handler = {};


handler.handleReqRes = (req, res) => {
    //request handle

    //get the url and parse it
    const parsedUrl = url.parse(req.url, true); //false just consider path /about
    console.log(parsedUrl);
    const path = parsedUrl.pathname;
    const trimedpath = path.replace(/^\/+|\/+$/g, ''); //this fn replace /about/ / and / show just about
    const method = req.method.toLowerCase(); //http method req ex get post
    const queryStringObject = parsedUrl.query; //query string name=wahid & age=23
    const decoder = new StringDecoder('utf-8');
    const headerObject = req.headers;
    let realData = '';
    const requestProperties = {
        parsedUrl,
        path,
        trimedpath,
        method,
        queryStringObject,
        decoder,
        headerObject,


    };

    const chosenHandler = routes[trimedpath] ? routes[trimedpath] : notFoundHandler;
    chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload) === 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        res.writeHead(statusCode);
        res.end(payloadString);




    });

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    })
    req.on('end', () => {
        realData += decoder.end();
    })

    console.log(realData);



    console.log(path);


    //reponse handle
    res.end('hello world sadik');

}



module.exports = handler