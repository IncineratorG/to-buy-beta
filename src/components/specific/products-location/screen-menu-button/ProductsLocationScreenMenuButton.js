import React, {useState} from 'react';
import {View, StyleSheet, TouchableNativeFeedback, Image} from 'react-native';
import {icons} from '../../../../assets/icons';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useTranslation} from '../../../../utils/common/localization';
import {SystemEventsHandler} from '../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

const ProductsLocationScreenMenuButton = ({
  availableMapProviderTypes,
  currentMapProviderType,
  onMapProviderPress,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const menuPressHandler = () => {
    setMenuVisible(!menuVisible);
  };

  const mapProviderTypePressHandler = (mapProviderType) => {
    SystemEventsHandler.onInfo({
      info: 'mapProviderTypePressHandler(): ' + mapProviderType,
    });

    setMenuVisible(false);
  };

  const noActionsHandler = () => {};

  const menuItems = availableMapProviderTypes.map((type) => {
    const markedItem = '\u2713 ' + type;
    const notMarkedItem = '     ' + type;
    const menuItemText =
      type === currentMapProviderType ? markedItem : notMarkedItem;

    return (
      <MenuOption
        key={type}
        onSelect={() => mapProviderTypePressHandler(type)}
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
          text={'Type'}
        />
        {menuItems}
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

export default ProductsLocationScreenMenuButton;
