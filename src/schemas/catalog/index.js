import {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLObjectType,
} from 'graphql/type';

import {
  SearchResultType,
  DetailResultType,
} from './productType';

import {
  getProducts,
  getProductDetail,
} from './../../resolver';

import config from './../../configs';

const CONFIG = config.catalog;

const CatalogType = new GraphQLObjectType({
  name: 'catalog',
  fields: () => ({
    search: {
      name: 'search',
      type: SearchResultType,
      args: {
        keyword: { type: GraphQLString, description: 'Keyword search query parameter. Fields indexed by the search engine'},
        brand_id: { type: GraphQLString, description: 'brand_id' },
        category_id: { type: GraphQLString, description: 'category_id' },
        size_id: { type: GraphQLString, description: 'size_id' },
        price_min: { type: GraphQLString, description: 'price_min' },
        price_max: { type: GraphQLString, description: 'price_max' },
        item_condition_id: { type: GraphQLString, description: 'item_condition_id' },
        status: { type: GraphQLString, description: 'status' },
        limit: { type: GraphQLString, description: 'limit' },
        page: { type: GraphQLString, description: 'page' },
      },
      resolve: (root, args) => getProducts(args, 'SEARCH'),
    },
    detail: {
      name: 'detail',
      type: DetailResultType,
      args: {
        id: { type: GraphQLString, description: 'product id' },
      },
      resolve: (root, args) => getProductDetail(args),
    },
  }),
});

// required for query resolving
const resolverObject = {
  search: '',
  detail: '',
};

const catalog = {
  name: 'catalog',
  type: CatalogType,
  resolve: () => resolverObject
};

export default catalog;
