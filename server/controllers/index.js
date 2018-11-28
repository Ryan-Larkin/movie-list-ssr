import express from 'express';
import configureStore from '../../src/store/configureStore';

import serverRenderer from '../middleware/renderer';

const path = require('path');

const router = express.Router();

const actionIndex = (req, res, next) => {
	const store = configureStore();

	// store.dispatch(import reducers and use them here asynchronously)
	// .then(use serverRenderer below in this "then" function)
	serverRenderer(store)(req, res, next);
};

router.use('^/$', actionIndex);
router.use('*', actionIndex);

router.use(express.static(
	path.resolve(__dirname, '..', 'build'),
	{ maxAge: '30d' },
));

export default router;
