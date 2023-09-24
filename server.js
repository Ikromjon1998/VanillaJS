const http = require('http');
const PORT = process.env.PORT || 5001;
const todos = require('./todos');
const getRequestData = require('./utils')

const server = http.createServer( async (request, response)=> {
    if(request.url === '/api/v1/todos' && request.method === 'GET') {
        response.writeHead(200, {
            "content-type": "application/json"
        })
        response.end(JSON.stringify(todos));
    } else if(request.url === '/api/v1/todos' && request.method === 'POST') {
        let reqBody = await getRequestData(request)
        todos.push(JSON.parse(reqBody));
        response.writeHead(200, {
            "content-type": "application/json"
        })
        response.end(JSON.stringify(JSON.parse(reqBody)));
    } else if(
        request.url.match(/\/api\/v1\/todos\/([0-9])/)
        && request.method === 'DELETE'
    ) {
        const id = request.url.split("/")[4]
        const todo = todos.find(t => t.id === parseInt(id))
        if (!todo) {
            response.writeHead(404, {
                "content-type": "application/json"
            })
            response.end('No todo with the specified id is available');
        } else {
            const index = todos.indexOf(todo)
            todos.splice(index, 1)
            response.writeHead(200, {
                "content-type": "application/json"
            })
            response.end('Deleted todo with the specified id');
        }
    }
})

server.listen(PORT, ()  => {
    console.log(`Server is ready and running on the port ${PORT}`);
})

server.on('error', (error) => {
    console.log(error);
})