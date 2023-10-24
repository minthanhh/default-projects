import express from 'express';
import { logger } from './shared/utils/logger';

const app = express();

app.get('/', (req, res) => {
   logger.info('Hello');
   res.send('change me to see updates, express~!');
});

app.get('/ip', async (req, res) => {
   const resp = await fetch('https://api.ipify.org?format=json');
   const json = await resp.json();
   res.json(json);
});

if (process.env.NODE_ENV === 'production') {
   app.listen(3000);
   console.log('listening on http://localhost:3000/');
}

export const viteNodeApp = app;
