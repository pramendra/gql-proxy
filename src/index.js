import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import config from './configs';
import helper from './helpers';
import schema from './schemas';


const { NODE_ENV, PORT, npm_package_name } = process.env; /* eslint-disable camelcase */
const APP = express();
const CORS = NODE_ENV === 'stage' ? { origin: true } : {};

APP.disable('x-powered-by');
APP.use(cors(CORS));

APP.get('/status.html', (req, res) => {
  res.send({ status: 'active', mode: NODE_ENV, appName: npm_package_name });
});

APP.use('/:version/:region/graphql', graphqlHTTP(req => {
  const { region, version } = req.params;
  if (config.version !== version) {
    throw new Error('Version Not Found');
  }
  helper.setConfig('catalog', { region });
  return { schema, graphiql: true };
}));

APP.listen(process.env.PORT, () => {
  console.log(`${npm_package_name} is running on port ${PORT} in ${NODE_ENV} mode`);
});
