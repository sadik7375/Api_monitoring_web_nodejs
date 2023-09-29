/*
Title: Api Monitoring
Description:
Author: Wahid sadik
Date: 28 / 9 / 2023
*/



const http = require('http'); //this module allow to ndjs to transfer data to over the hyper text transfer proctocol


const app = {};
const { handleReqRes } = require('./helper/handleReqRes')

//app object add config

app.config = {
    port: 8000,
}

//create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);

    server.listen(app.config.port, () => {
        console.log(`listenting port: ${app.config.port}`);
    })
}

// handle request response

app.handleReqRes = handleReqRes;

//call createserver and start server
app.createServer();