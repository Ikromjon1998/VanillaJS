const http = require('http');
const PORT = process.env.PORT || 5001;
const todos = require('todos');

const server = http.createServer((request, response)=> {
    response.writeHead(200, {
        "content-type": "text/plain"
    })
    response.end('Hello')
})

server.listen(PORT, ()  => {
    console.log(`Server is ready and running on the port ${PORT}`);
})

server.on('error', (error) => {
    console.log(error);
})