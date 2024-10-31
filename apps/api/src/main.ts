import express, { Request } from 'express';

import expressWs from 'express-ws';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3021;

const expressInstance = express();

const { app } = expressWs(expressInstance);

app.ws('/', function(ws, _req: Request) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('socket', '<<<');
});

app.get('/', (_req, res) => {
  res.send({ message: 'Hello collabo API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
