import express from 'express';
import Loadable from 'react-loadable';
import indexController from './controllers/index';

const PORT = 3000;

const app = express();

app.use(indexController);

/* eslint-disable */
Loadable.preloadAll().then(() => {
	app.listen(PORT, (err) => {
		if (err) { return console.log('Error: ', error) }
		console.log('Listening on:', PORT);
	});
});
/* eslint-enable */
