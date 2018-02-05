let config = {};
const endpoint = {
  getAPIURL: (type, params, reqConfig) => {
    let endpoint = `${config.basepath}${config.version}/${config.brand}/${config.region}`;
    switch (type) {
      case 'Search':
        // const shouldApplySort = params.indexOf('&sort') === -1 ? `&sort=manual` : ``;
        // endpoint = `${endpoint}/search_index/search?${params}&response=extended${shouldApplySort}`;
        endpoint = `${endpoint}/search_index/search?${params}`;
        break;
      case 'Detail':
        endpoint = `${endpoint}/items/get?${params}`;
        break;
      default:
        endpoint = '';
        break;
    }
    return endpoint;
  },
  setConfig: (conf) => {
    config = conf;
  },
  getConfig: () => config,
};

export default endpoint;
