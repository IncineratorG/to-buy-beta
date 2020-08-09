import {
  SYSTEM_PREFERENCES_TABLE,
  SYSTEM_PREFERENCES_TABLE_LANGUAGE_CODE,
  SYSTEM_PREFERENCES_TABLE_ID,
} from '../../../../tables/systemPreferencesTable';

const sssDbUpgradeData = {
  actualVersion: '1',
  versions: {
    v1: {
      upgradeScripts: [
        'CREATE TABLE IF NOT EXISTS ' +
          SYSTEM_PREFERENCES_TABLE +
          ' ' +
          '(' +
          SYSTEM_PREFERENCES_TABLE_ID +
          ' INTEGER PRIMARY KEY NOT NULL, ' +
          SYSTEM_PREFERENCES_TABLE_LANGUAGE_CODE +
          ' TEXT)',
      ],
    },
  },
};

export default sssDbUpgradeData;
