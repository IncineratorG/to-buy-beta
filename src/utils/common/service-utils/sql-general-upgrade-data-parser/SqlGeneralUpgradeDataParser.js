import {SystemEventsHandler} from '../../system-events-handler/SystemEventsHandler';

export class SqlGeneralUpgradeDataParser {
  #parserName;

  constructor({parserName}) {
    this.#parserName = parserName;
  }

  getActualVersion({upgradeData}) {
    return upgradeData.actualVersion;
  }

  getUpgradeScripts({currentVersion, targetVersion, upgradeData}) {
    if (!targetVersion || !upgradeData) {
      SystemEventsHandler.onError({
        err: this.#parserName + '->getUpgradeScripts(): BAD_INPUT',
      });
      return [];
    }

    currentVersion = currentVersion ? currentVersion : '0';

    const currentVersionCode = 'v' + currentVersion;
    const targetVersionCode = 'v' + targetVersion;

    const versionsObj = upgradeData.versions;
    if (!versionsObj) {
      SystemEventsHandler.onError({
        err: this.#parserName + '->getUpgradeScripts(): BAD_VERSIONS_OBJECT',
      });
      return [];
    }

    const availableVersionsCodes = Object.keys(versionsObj);
    availableVersionsCodes.sort((v1, v2) => {
      return v1 > v2;
    });

    const upgradeScripts = [];
    for (let i = 0; i < availableVersionsCodes.length; ++i) {
      const versionCode = availableVersionsCodes[i];
      if (versionCode <= currentVersionCode) {
        continue;
      }

      if (versionCode > targetVersionCode) {
        break;
      }

      const requiredVersionObject = versionsObj[versionCode];
      if (!requiredVersionObject) {
        SystemEventsHandler.onError({
          err:
            this.#parserName +
            '->getUpgradeScripts(): BAD_VERSION_OBJECT_FOR_CODE: ' +
            versionCode,
        });
        continue;
      }

      const versionUpgradeScripts = requiredVersionObject.upgradeScripts;
      if (!versionUpgradeScripts) {
        SystemEventsHandler.onError({
          err:
            this.#parserName +
            '->getUpgradeScripts(): BAD_VERSION_UPGRADE_SCRIPT_FOR_CODE: ' +
            versionCode,
        });
        continue;
      }

      upgradeScripts.push(...versionUpgradeScripts);
    }

    return upgradeScripts;
  }
}
