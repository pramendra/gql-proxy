
import fetch from 'node-fetch';
import config from './../../configs';

console.log("testing");
export default (API, CONFIG, urlType, params, reqConfig) => {
  API.setConfig(CONFIG);
  const queryParam = encodeURI(params);
  const apiEndPoint = API.getAPIURL(urlType, queryParam, reqConfig);
  console.log(apiEndPoint);
  return fetch(apiEndPoint, { timeout: config.timeout })
    .then(res => res.json())
    .then(data => data);
};
