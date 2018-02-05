import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLBoolean,
  GraphQLFloat,
} from 'graphql/type';

const ProductStatusType = new GraphQLEnumType({
  name: 'status',
  values: {
    on_sale: { value: 'on_sale' },
    trading: { value: 'trading' },
    sold_out: { value: 'sold_out' },
    stop: { value: 'stop' },
    cancel: { value: 'cancel' },
    admin_cancel: { value: 'admin_cancel' },
  },
});

const SellerType = new GraphQLObjectType({
  name: 'seller',
  description: 'seller info',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    photo_url: { type: GraphQLString },
    photo_thumbnail_url: { type: GraphQLString },
    register_sms_confirmation: { type: GraphQLString },
  }),
});

const CategoryType = new GraphQLObjectType({
  name: 'item_category',
  description: 'item_category info',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    display_order: { type: GraphQLInt },
    parent_category_id: { type: GraphQLInt },
    parent_category_name: { type: GraphQLString },
    root_category_id: { type: GraphQLInt },
    root_category_name: { type: GraphQLString },
    brand_group_id: { type: GraphQLInt },
  }),
});

const ItemConditionType = new GraphQLObjectType({
  name: 'item_condition',
  description: 'item_condition info',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

const ShippingPayerType = new GraphQLObjectType({
  name: 'shipping_payer',
  description: 'shipping_payer info',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    code: { type: GraphQLString },
  }),
});

const shippingMethodType = new GraphQLObjectType({
  name: 'shipping_method',
  description: 'shipping_method info',
  fields: () => ({
    id: { type: GraphQLInt },
  }),
});

const ShippingClassType = new GraphQLObjectType({
  name: 'shipping_class',
  description: 'shipping_class info',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    carrier: { type: GraphQLString },
    carrier_display_name: { type: GraphQLString },
    request_class_display_name: { type: GraphQLString },
  }),
});

const PrivateChatType = new GraphQLObjectType({
  name: 'private_chat',
  description: 'private_chat info',
  fields: () => ({
    available: { type: GraphQLBoolean },
    item_id: { type: GraphQLString },
    guest_id: { type: GraphQLString },
  }),
});

const ItemAspectRatiosType = new GraphQLObjectType({
  name: 'item_aspect_ratios',
  description: 'item_aspect_ratios info',
  fields: () => ({
    width: { type: GraphQLFloat },
    height: { type: GraphQLFloat },
  }),
});

const productFields = {
  id: { type: GraphQLID, description: 'id of the product', resolve: (prod) => prod.id },
  seller: { type: SellerType },
  status: { type: ProductStatusType },
  name: { type: GraphQLString },
  price: { type: GraphQLInt },
  description: { type: GraphQLString },
  thumbnails: { type: new GraphQLList(GraphQLString) },
  photo_aspect_ratios: { type: new GraphQLList(GraphQLFloat) },
  item_category: { type: CategoryType },
  num_likes: { type: GraphQLInt },
  num_comments: { type: GraphQLInt },
  updated: { type: GraphQLInt },
  created: { type: GraphQLInt },
  pager_id: { type: GraphQLInt },
  liked: { type: GraphQLBoolean },
  checksum: { type: GraphQLString },
};

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    ...productFields,
    root_category_id: { type: GraphQLInt },
  }),
});


const DetailsProductType = new GraphQLObjectType({
  name: 'DetailProduct',
  fields: () => ({
    ...productFields,
    photos: { type: new GraphQLList(GraphQLString) },
    item_condition: { type: ItemConditionType },
    item_brand: { type: ItemConditionType },
    shipping_payer: { type: ShippingPayerType },
    shipping_method: { type: shippingMethodType },
    shipping_class: { type: ShippingClassType },
    comments: { type: new GraphQLList(GraphQLFloat) },
    is_dynamic_shipping_fee: { type: GraphQLBoolean },
    private_chat: { type: PrivateChatType },
    message: { type: GraphQLString },
    item_aspect_ratios: { type: ItemAspectRatiosType },
  }),
});

/*
 * Define the review type structure of the product
 */
const DetailResultType = new GraphQLObjectType({
  name: 'DetailResultType',
  fields: () => ({
    data: { type: DetailsProductType },
  }),
});

const SearchResultType = new GraphQLObjectType({
  name: 'SearchResultType',
  fields: () => ({
    data: { type: new GraphQLList(ProductType) },
  }),
});


export {
  SearchResultType,
  DetailResultType,
};
