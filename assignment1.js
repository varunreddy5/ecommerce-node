const http = require('http')

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node.js</title></head>');
    res.write('<body><form action="create-user" method="POST"><input type="text" name="create-user"><button>Send</button></body>');
    res.write('</html>');
    res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const result = Buffer.concat(body).toString();
      const message = result.split('=')[0];
      console.log(message);
    });
    res.writeHead(302, { 'Location': '/' });
    res.end();
  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node.js</title></head>');
    res.write('<body><ul><li>User1</li><li>User10uf</li></ul></body>')
    res.write('</html>');
    res.end();
  }
});

server.listen(3000);