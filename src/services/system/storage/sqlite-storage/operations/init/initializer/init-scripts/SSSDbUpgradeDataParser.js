import {SystemEventsHandler} from '../../../../../../../service-utils/system-events-handler/SystemEventsHandler';

class SSSDbUpgradeDataParser {
  static getActualVersion({upgradeData}) {
    return upgradeData.actualVersion;
  }

  static getUpgradeScripts({currentVersion, targetVersion, upgradeData}) {
    if (!targetVersion || !upgradeData) {
      SystemEventsHandler.onError({
        err: 'SSSDbUpgradeDataParser->getUpgradeScripts(): BAD_INPUT',
      });
      return [];
    }

    currentVersion = currentVersion ? currentVersion : '0';

    const currentVersionCode = 'v' + currentVersion;
    const targetVersionCode = 'v' + targetVersion;

    const versionsObj = upgradeData.versions;
    if (!versionsObj) {
      SystemEventsHandler.onError({
        err: 'SSSDbUpgradeDataParser->getUpgradeScripts(): BAD_VERSIONS_OBJECT',
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
            'SSSDbUpgradeDataParser->getUpgradeScripts(): BAD_VERSION_OBJECT_FOR_CODE: ' +
            versionCode,
        });
        continue;
      }

      const versionUpgradeScripts = requiredVersionObject.upgradeScripts;
      if (!versionUpgradeScripts) {
        SystemEventsHandler.onError({
          err:
            'SSSDbUpgradeDataParser->getUpgradeScripts(): BAD_VERSION_UPGRADE_SCRIPT_FOR_CODE: ' +
            versionCode,
        });
        continue;
      }

      upgradeScripts.push(...versionUpgradeScripts);
    }

    return upgradeScripts;
  }
}

export default SSSDbUpgradeDataParser;
