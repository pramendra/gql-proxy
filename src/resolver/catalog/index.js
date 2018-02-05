import config from './../../configs';
import request from './../common/request';
import API from './endpoint';

const APIType = {
  SEARCH: 'Search',
  DETAIL: 'Detail',
};

const CONFIG = config.catalog;

function parseParams(params) {
  let query = '';
  if (typeof params !== 'string') {
    Object.keys(params).map((arg) => {
      query = `${query}&${arg}=${params[arg]}`;
      // query = query.replace('&query', '&keyword');
    });
  } else {
    query = params;
  }
  return query;
}

function getReqConfig(args) {
  return { ...args };
  // const locale = newArgs.lang;
  // delete newArgs.lang;
  // if (!newArgs.inStock) {
  //   delete newArgs.inStock;
  // }
  // const reqConfig = { locale };
  // return { config: reqConfig, newArgs };
}

// Use the methods to manipulate data in Future
async function getProducts(args, type) {
  const req = getReqConfig(args);
  const query = parseParams(req.newArgs);
  const product = await request(API, CONFIG, APIType[type], query, req.config);
  if (product.items) {
    product.items.map(current => {
      const prod = current;
      prod.lang = args.lang;
    });
  }
  return product;
}

async function getProductDetail(args) {
  const req = getReqConfig(args);
  const query = parseParams(req.newArgs);
  const product = await request(API, CONFIG, APIType.DETAIL, query, req.config);
  return product;
}

export {
  getProducts,
  getProductDetail,
};
