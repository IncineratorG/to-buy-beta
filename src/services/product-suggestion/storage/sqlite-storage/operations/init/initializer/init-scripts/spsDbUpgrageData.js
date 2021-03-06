import {
  SUGGESTED_PRODUCTS_TABLE,
  SUGGESTED_PRODUCTS_TABLE_CATEGORY_ID,
  SUGGESTED_PRODUCTS_TABLE_CREATE_TIMESTAMP,
  SUGGESTED_PRODUCTS_TABLE_ID,
  SUGGESTED_PRODUCTS_TABLE_PRODUCT_NAME,
  SUGGESTED_PRODUCTS_TABLE_UNIT_ID,
  SUGGESTED_PRODUCTS_TABLE_UPDATE_TIMESTAMP,
  SUGGESTED_PRODUCTS_TABLE_USAGE_COUNT,
} from '../../../../tables/suggestedProductsTable';

const spsDbUpgradeData = {
  actualVersion: '1',
  versions: {
    v1: {
      upgradeScripts: [
        'CREATE TABLE IF NOT EXISTS ' +
          SUGGESTED_PRODUCTS_TABLE +
          ' ' +
          '(' +
          SUGGESTED_PRODUCTS_TABLE_ID +
          ' INTEGER PRIMARY KEY NOT NULL, ' +
          SUGGESTED_PRODUCTS_TABLE_PRODUCT_NAME +
          ' TEXT, ' +
          SUGGESTED_PRODUCTS_TABLE_UNIT_ID +
          ' INTEGER, ' +
          SUGGESTED_PRODUCTS_TABLE_CATEGORY_ID +
          ' INTEGER, ' +
          SUGGESTED_PRODUCTS_TABLE_USAGE_COUNT +
          ' INTEGER, ' +
          SUGGESTED_PRODUCTS_TABLE_CREATE_TIMESTAMP +
          ' INTEGER NOT NULL, ' +
          SUGGESTED_PRODUCTS_TABLE_UPDATE_TIMESTAMP +
          ' INTEGER NOT NULL)',
      ],
    },
  },
};

export default spsDbUpgradeData;
