import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
} from 'react-native';
import {SystemEventsHandler} from '../../../../../../utils/common/system-events-handler/SystemEventsHandler';
import {icons} from '../../../../../../assets/icons';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useTranslation} from '../../../../../../utils/common/localization';

const ProductNotCompleted = ({
  styles,
  product,
  categoriesMap,
  unitsMap,
  onStatusPress,
  onProductPress,
  onProductLongPress,
  onFindNearbyOnMapPress,
}) => {
  const {t} = useTranslation();

  const {confirmationStatus} = product;
  let awaitConfirmation = false;
  let confirmed = false;

  if (confirmationStatus) {
    awaitConfirmation = confirmationStatus.awaitConfirmation;
    confirmed = confirmationStatus.confirmed;
  }

  const [menuVisible, setMenuVisible] = useState(false);

  const categoryDescription = categoriesMap.get(product.categoryId);
  const categoryColor = categoryDescription
    ? categoryDescription.color
    : 'lightgrey';

  const productUnit = unitsMap.get(product.unitId);
  let productUnitName = '';
  if (productUnit) {
    if (productUnit.translationMark) {
      productUnitName = t(productUnit.translationMark);
    } else {
      productUnitName = productUnit.name;
    }
  }
  const productUnitUnspecified = productUnit ? productUnit.unspecified : false;

  const productPressHandler = () => {
    if (awaitConfirmation) {
      return;
    }

    if (onProductPress) {
      onProductPress(product);
    }
  };

  const productLongPressHandler = () => {
    if (awaitConfirmation) {
      return;
    }

    setMenuVisible(true);
  };

  const statusPressHandler = () => {
    if (awaitConfirmation) {
      return;
    }

    if (onStatusPress) {
      onStatusPress(product);
    }
  };

  const menuPressHandler = () => {
    setMenuVisible(!menuVisible);
  };

  const editPressHandler = () => {
    if (awaitConfirmation) {
      return;
    }

    if (onProductPress) {
      onProductPress(product);
    }
    setMenuVisible(false);
  };

  const removePressHandler = () => {
    if (awaitConfirmation) {
      return;
    }

    if (onProductLongPress) {
      onProductLongPress(product);
    }
    setMenuVisible(false);
  };

  const markAsBoughtPressHandler = () => {
    if (awaitConfirmation) {
      return;
    }

    if (onStatusPress) {
      onStatusPress(product);
    }
    setMenuVisible(false);
  };

  const findNearbyOnMapPressHandler = () => {
    if (awaitConfirmation) {
      return;
    }

    if (onFindNearbyOnMapPress) {
      onFindNearbyOnMapPress(product);
    }
    setMenuVisible(false);
  };

  const noteExistComponent = (
    <View style={styles.noteContainer}>
      <Text style={styles.note}>{product.note}</Text>
    </View>
  );

  const noteNotExistComponent = <View />;

  const noteComponent =
    product.note.length > 0 ? noteExistComponent : noteNotExistComponent;

  const quantityExistComponent = (
    <View style={styles.quantityContainer}>
      <View style={styles.quantityCountContainer}>
        <Text style={styles.quantityCount} numberOfLines={1}>
          {product.quantity}
        </Text>
      </View>
      <View style={styles.quantityUnitContainer}>
        <Text style={styles.quantityUnit} numberOfLines={1}>
          {productUnitName}
        </Text>
      </View>
    </View>
  );

  const quantityNotExistComponent = <View />;

  const quantityComponent = productUnitUnspecified
    ? quantityNotExistComponent
    : quantityExistComponent;

  const awaitConfirmationComponent = awaitConfirmation ? (
    <Image style={styles.statusIcon} source={icons.progress_grey} />
  ) : null;

  const menuComponent = (
    <Menu opened={menuVisible} onBackdropPress={menuPressHandler}>
      <MenuTrigger text="" />
      <MenuOptions>
        <MenuOption
          onSelect={markAsBoughtPressHandler}
          text={
            productUnitUnspecified
              ? t('ProductNotCompleted_menuMarkUnspecified')
              : t('ProductNotCompleted_menuMarkAsBoughtOption')
          }
        />
        <MenuOption
          onSelect={editPressHandler}
          text={t('ProductNotCompleted_menuEditOption')}
        />
        <MenuOption
          onSelect={removePressHandler}
          text={t('ProductNotCompleted_menuRemoveOption')}
        />
        <MenuOption
          onSelect={findNearbyOnMapPressHandler}
          text={t('ProductNotCompleted_menuFindNearbyOnMap')}
        />
      </MenuOptions>
    </Menu>
  );

  return (
    <TouchableHighlight
      style={styles.touchable}
      underlayColor={categoryColor}
      onPress={productPressHandler}
      onLongPress={productLongPressHandler}>
      <View style={[styles.mainContainer, {borderColor: categoryColor}]}>
        <View
          style={[styles.colorComponent, {backgroundColor: categoryColor}]}
        />
        <View style={styles.infoContainer}>
          <View style={styles.majorInfoContainer}>
            <View style={styles.productNameContainer}>
              <Text
                style={styles.productName}
                numberOfLines={4}
                elipsizeMode="tail">
                {product.name}
              </Text>
            </View>
            {quantityComponent}
          </View>
          {noteComponent}
        </View>
        <TouchableHighlight
          style={styles.menuTouchable}
          underlayColor="#e7e7e7"
          onPress={menuPressHandler}>
          <View style={styles.menuContainer}>
            <Image source={icons.menu_dotted} />
            {menuComponent}
          </View>
        </TouchableHighlight>
        <TouchableWithoutFeedback
          style={styles.statusTouchable}
          onPress={statusPressHandler}>
          <View style={styles.statusContainer}>
            <View style={styles.statusNotFinished}>
              {awaitConfirmationComponent}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableHighlight>
  );
};

export default React.memo(ProductNotCompleted);
