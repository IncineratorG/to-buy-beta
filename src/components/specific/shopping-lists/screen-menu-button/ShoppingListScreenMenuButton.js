import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  Linking,
} from 'react-native';
import {icons} from '../../../../assets/icons';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useTranslation} from '../../../../utils/common/localization';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const ShoppingListScreenMenuButton = ({
  availableLanguages,
  currentLanguage,
  onLanguagePress,
}) => {
  const privacyPolicyUrl =
    'https://github.com/IncineratorG/to-buy-beta/blob/master/privacy_policy.md';

  const {t} = useTranslation();

  const [menuVisible, setMenuVisible] = useState(false);

  const menuPressHandler = () => {
    setMenuVisible(!menuVisible);
  };

  const languagePressHandler = (language) => {
    if (onLanguagePress) {
      onLanguagePress({languageCode: language});
    }
    setMenuVisible(false);
  };

  const noActionsHandler = () => {};

  const privacyPolicyPressHandler = () => {
    Linking.canOpenURL(privacyPolicyUrl).then((supported) => {
      if (supported) {
        Linking.openURL(privacyPolicyUrl);
      } else {
        SystemEventsHandler.onError({
          err: "Don't know how to open URI: " + privacyPolicyUrl,
        });
      }
    });

    setMenuVisible(false);
  };

  const menuItems = availableLanguages.map((language) => {
    const markedItem = '\u2713 ' + t(language);
    const notMarkedItem = '     ' + t(language);
    const menuItemText =
      language === currentLanguage ? markedItem : notMarkedItem;

    return (
      <MenuOption
        key={language}
        onSelect={() => languagePressHandler(language)}
        text={menuItemText}
      />
    );
  });

  const menuComponent = (
    <Menu opened={menuVisible} onBackdropPress={menuPressHandler}>
      <MenuTrigger text="" />
      <MenuOptions>
        <MenuOption
          onSelect={noActionsHandler}
          disableTouchable={true}
          text={t('language')}
        />
        {menuItems}
        <MenuOption
          onSelect={privacyPolicyPressHandler}
          disableTouchable={false}
          text={'Privacy policy'}
        />
      </MenuOptions>
    </Menu>
  );

  return (
    <TouchableNativeFeedback
      style={styles.touchable}
      useForeground={true}
      underlayColor={'lightgrey'}
      onPress={menuPressHandler}>
      <View style={styles.mainContainer}>
        <Image style={styles.menuIcon} source={icons.menu_lined} />
        {menuComponent}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 50,
    borderRadius: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    transform: [{scale: 0.5}],
  },
  touchable: {
    flex: 1,
    width: 50,
    borderRadius: 2,
  },
});

export default ShoppingListScreenMenuButton;
