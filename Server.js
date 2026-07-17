const http = require('http');
const handleRoutes = require('./routes');

const PORT = 3000;

const server = http.createServer(handleRoutes);

server.listen(PORT, () => {
  console.log(`Modular Student REST API running at http://localhost:${PORT}`);
});