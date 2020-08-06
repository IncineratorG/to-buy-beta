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
  onRenameList,
  onAllBought,
  onAllNotBought,
  onCurrentCategoryBought,
  onCurrentCategoryNotBought,
  onRemoveAll,
  onRemoveBought,
}) => {
  const {t} = useTranslation();

  const [menuVisible, setMenuVisible] = useState(false);

  const menuPressHandler = () => {
    setMenuVisible(!menuVisible);
  };

  const renameListHandler = () => {
    if (onRenameList) {
      onRenameList();
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

  const markCurrentCategoryAsBoughtHandler = () => {
    if (onCurrentCategoryBought) {
      onCurrentCategoryBought();
    }
    setMenuVisible(false);
  };

  const markCurrentCategoryAsNotBought = () => {
    if (onCurrentCategoryNotBought) {
      onCurrentCategoryNotBought();
    }
    setMenuVisible(false);
  };

  const removeBoughtHandler = () => {
    if (onRemoveBought) {
      onRemoveBought();
    }
    setMenuVisible(false);
  };

  const removeCurrentCategoryHandler = () => {
    setMenuVisible(false);
  };

  const removeAllHandler = () => {
    if (onRemoveAll) {
      onRemoveAll();
    }
    setMenuVisible(false);
  };

  const noActionsHandler = () => {};

  const menuComponent = (
    <Menu opened={menuVisible} onBackdropPress={menuPressHandler}>
      <MenuTrigger text="" />
      <MenuOptions>
        <MenuOption
          onSelect={renameListHandler}
          text={t('ProductsListScreenMenuButton_menuRenameList')}
        />
        <MenuOption onSelect={noActionsHandler} text={''} />
        <MenuOption
          onSelect={markAllAsBoughtHandler}
          text={t('ProductsListScreenMenuButton_markAllAsBoughtOption')}
        />
        <MenuOption
          onSelect={markAllAsNotBoughtHandler}
          text={t('ProductsListScreenMenuButton_markAllAsNotOption')}
        />
        <MenuOption
          onSelect={markCurrentCategoryAsBoughtHandler}
          text={t(
            'ProductsListScreenMenuButton_markCurrentCategoryAsBoughtOption',
          )}
        />
        <MenuOption
          onSelect={markCurrentCategoryAsNotBought}
          text={t(
            'ProductsListScreenMenuButton_markCurrentCategoryAsNotBoughtOption',
          )}
        />
        <MenuOption onSelect={noActionsHandler} text={''} />
        <MenuOption
          onSelect={removeBoughtHandler}
          text={t('ProductsListScreenMenuButton_menuRemoveBoughtOption')}
        />
        <MenuOption
          onSelect={removeCurrentCategoryHandler}
          text={t(
            'ProductsListScreenMenuButton_menuRemoveCurrentCategoryOption',
          )}
        />
        <MenuOption
          onSelect={removeAllHandler}
          text={t('ProductsListScreenMenuButton_menuRemoveAllOption')}
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
