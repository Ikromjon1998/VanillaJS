const http = require('http');
const PORT = process.env.PORT || 5001;
const todos = require('./todos');

const server = http.createServer((request, response)=> {
    if(request.url === '/api/v1/todos' && request.method === 'GET') {
        response.writeHead(200, {
            "content-type": "application/json"
        })
        response.end(JSON.stringify(todos));
    }
})

server.listen(PORT, ()  => {
    console.log(`Server is ready and running on the port ${PORT}`);
})

server.on('error', (error) => {
    console.log(error);
})