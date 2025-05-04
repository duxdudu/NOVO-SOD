const http = require('http');
const port = 3006;

const server=http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end("this our prayers server");

})
server.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})