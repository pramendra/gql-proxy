import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import catalog from './catalog';
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      catalog,
    },
  }),
});
export default schema;
