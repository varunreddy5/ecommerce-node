const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node js server</title></head>');
    res.write('<body><form action = "/message" method="POST"><input type="text" name="message"><button>Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
      console.log(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[0]
      fs.writeFile('message.txt', message, (err) => {
        res.writeHead(302, { 'Location': '/' });
        return res.end();
      });
    });
  }
});

server.listen(3000);
