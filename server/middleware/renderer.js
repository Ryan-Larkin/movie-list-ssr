import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux';
import manifest from '../../build/asset-manifest.json';

import App from '../../src/App';

const path = require('path');
const fs = require('fs');

const extractAssets = (assets, chunks) => Object.keys(assets)
	.filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
	.map(k => assets[k]);

export default (store) => (req, res, next) => { /* eslint-disable-line */
	const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

	fs.readFile(filePath, 'utf8', (err, htmlData) => {
		if (err) {
			console.error('Renderer error:', err); /* eslint-disable-line */
			return res.statu(404).end();
		}

		const modules = [];

		const html = ReactDOMServer.renderToString(
			<Loadable.Capture report={m => modules.push(m)}>
				<ReduxProvider store={store}>
					<App />
				</ReduxProvider>
			</Loadable.Capture>,
		);

		const extraChunks = extractAssets(manifest, modules)
			.map(c => `<script type="text/javascript" src="/${c}"></script>`);

		const reduxState = JSON.stringify(store.getState());

		return res.send(
			htmlData
				.replace(
					'<div id="root"></div>',
					`<div id="root">${html}</div>`,
				)
				.replace(
					'</body>',
					`${extraChunks.join('')}</body>`,
				)
				.replace('"__SERVER_REDUX_STATE__"', reduxState),
		);
	});
};
