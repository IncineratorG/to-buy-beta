import React, {useState} from 'react';
import {View, Image, Text, FlatList, TouchableHighlight} from 'react-native';
import {icons} from '../../../../../../assets/icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useTranslation} from '../../../../../../utils/common/localization';

const ListOfShoppingListsItemGeneral = ({
  styles,
  listItem,
  online,
  currentEmail,
  onItemPress,
  onRemovePress,
  onSharedPress,
  onRenamePress,
  onCopyPress,
}) => {
  const {t} = useTranslation();

  const {
    id,
    name,
    completedItemsCount,
    totalItemsCount,
    creator,
    receivers,
    removing,
    removeError,
  } = listItem;

  if (removing) {
    console.log('REMOVING->ID: ' + id);
  }
  if (removeError) {
    console.log(
      'REMOVE_ERROR->ID: ' + id + ', DESCRIPTION: ' + removeError.description,
    );
  }

  const collaborators = [];
  if (creator && receivers) {
    if (creator !== currentEmail) {
      collaborators.push(creator);
    }
    receivers.forEach((receiver) => {
      if (receiver !== currentEmail) {
        collaborators.push(receiver);
      }
    });
  }

  let hasUncompletedProducts = false;
  if (totalItemsCount > 0 && totalItemsCount > completedItemsCount) {
    hasUncompletedProducts = true;
  }

  const [menuVisible, setMenuVisible] = useState(false);
  // const currentUserIsListAuthor = !creator || creator === currentEmail;

  const onItemPressHandler = () => {
    if (onItemPress) {
      onItemPress(listItem.id);
    }
  };

  const onRemovePressHandler = () => {
    if (onRemovePress) {
      onRemovePress(listItem);
    }
    setMenuVisible(false);
  };

  const onSharePressHandler = () => {
    if (onSharedPress) {
      onSharedPress(id);
    }
    setMenuVisible(false);
  };

  const onRenamePressHandler = () => {
    if (onRenamePress) {
      onRenamePress(listItem);
    }
    setMenuVisible(false);
  };

  const onCopyPressHandler = () => {
    if (onCopyPress) {
      onCopyPress(listItem);
    }
    setMenuVisible(false);
  };

  const onMenuPressHandler = () => {
    setMenuVisible(!menuVisible);
  };

  const footerSeparatorLineComponent =
    collaborators && collaborators.length > 0 ? (
      <View style={styles.footerSeparationLine} />
    ) : null;

  const collaboratorsIconComponent = null;

  const shareMenuOption = hasUncompletedProducts ? (
    <MenuOption
      onSelect={onSharePressHandler}
      text={t('ListOfShoppingListsItemGeneral_menuShareOption')}
    />
  ) : null;

  const menuComponent = (
    <Menu opened={menuVisible} onBackdropPress={onMenuPressHandler}>
      <MenuTrigger text="" />
      <MenuOptions>
        {shareMenuOption}
        <MenuOption
          onSelect={onRenamePressHandler}
          text={t('ListOfShoppingListsItemGeneral_menuRenameOption')}
        />
        <MenuOption
          onSelect={onCopyPressHandler}
          text={t('ListOfShoppingListsItemGeneral_menuCopyOption')}
        />
        <MenuOption
          onSelect={onRemovePressHandler}
          text={t('ListOfShoppingListsItemGeneral_menuRemoveOption')}
        />
      </MenuOptions>
    </Menu>
  );

  return (
    <View style={styles.mainContainer}>
      <TouchableHighlight
        underlayColor="#e7e7e7"
        style={styles.bodyContainerTouchable}
        onPress={onItemPressHandler}>
        <View style={styles.bodyContainer}>
          <View style={styles.listNameContainer}>
            <Text style={styles.listName}>{name}</Text>
          </View>
          <View style={styles.completionContainer}>
            <Text style={styles.completionValue}>
              {completedItemsCount} / {totalItemsCount}
            </Text>
          </View>
          <View style={styles.menuWrapper}>
            <TouchableHighlight
              style={styles.menuTouchable}
              underlayColor="#e7e7e7"
              onPress={onMenuPressHandler}>
              <View style={styles.menuContainer}>
                <Image style={styles.menuIcon} source={icons.menu_dotted} />
                {menuComponent}
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
      <View style={styles.footerContainer}>
        {footerSeparatorLineComponent}
        <View style={styles.collaboratorsContainer}>
          {collaboratorsIconComponent}
          <FlatList
            data={collaborators}
            horizontal={true}
            activeOpacity={1}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    backgroundColor: 'lightgrey',
                    marginTop: 4,
                    marginBottom: 4,
                    marginRight: 4,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{marginLeft: 4, marginRight: 4}}>{item}</Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default ListOfShoppingListsItemGeneral;
