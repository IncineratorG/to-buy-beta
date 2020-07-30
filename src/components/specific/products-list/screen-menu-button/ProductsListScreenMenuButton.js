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

const ProductsListScreenMenuButton = ({
  onRemoveAll,
  onAllBought,
  onAllNotBought,
}) => {
  const {t} = useTranslation();

  const [menuVisible, setMenuVisible] = useState(false);

  const menuPressHandler = () => {
    setMenuVisible(!menuVisible);
  };

  const removeAllHandler = () => {
    if (onRemoveAll) {
      onRemoveAll();
    }
    setMenuVisible(false);
  };

  const markAllAsBoughtHandler = () => {
    if (onAllBought) {
      onAllBought();
    }
    setMenuVisible(false);
  };

  const markAllAsNotBoughtHandler = () => {
    if (onAllNotBought) {
      onAllNotBought();
    }
    setMenuVisible(false);
  };

  const menuComponent = (
    <Menu opened={menuVisible} onBackdropPress={menuPressHandler}>
      <MenuTrigger text="" />
      <MenuOptions>
        <MenuOption
          onSelect={removeAllHandler}
          text={t('ProductsListScreenMenuButton_menuRemoveAllOption')}
        />
        <MenuOption
          onSelect={markAllAsBoughtHandler}
          text={t('ProductsListScreenMenuButton_markAllAsBoughtOption')}
        />
        <MenuOption
          onSelect={markAllAsNotBoughtHandler}
          text={t('ProductsListScreenMenuButton_markAllAsNotOption')}
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

export default ProductsListScreenMenuButton;
