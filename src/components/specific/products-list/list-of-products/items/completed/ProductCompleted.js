import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import {icons} from '../../../../../../assets/icons';
import {useTranslation} from '../../../../../../utils/common/localization';

const ProductCompleted = ({
  styles,
  unitsMap,
  product,
  onStatusPress,
  onProductLongPress,
}) => {
  const {t} = useTranslation();

  const {confirmationStatus} = product;
  let awaitConfirmation = false;
  let confirmed = false;

  if (confirmationStatus) {
    awaitConfirmation = confirmationStatus.awaitConfirmation;
    confirmed = confirmationStatus.confirmed;
  }

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

  const statusPressHandler = () => {
    if (awaitConfirmation) {
      return;
    }

    onStatusPress(product);
  };

  const productLongPressHandler = () => {
    if (awaitConfirmation) {
      return;
    }

    if (onProductLongPress) {
      onProductLongPress(product);
    }
  };

  const noteExistComponent = (
    <View style={styles.noteContainer}>
      <Text style={styles.note}>{product.note}</Text>
    </View>
  );

  const noteNotExistComponent = <View />;

  const noteComponent =
    product.note.length > 0 ? noteExistComponent : noteNotExistComponent;

  const statusImageComponent = awaitConfirmation ? (
    <Image style={styles.awaitConfirmationIcon} source={icons.progress_white} />
  ) : (
    <Image style={styles.checmarkIcon} source={icons.checkmark} />
  );

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

  return (
    <TouchableHighlight
      style={styles.touchable}
      onPress={() => console.log('PRESS')}
      onLongPress={productLongPressHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.majorInfoContainer}>
            <View style={styles.productNameContainer}>
              <Text
                style={styles.productName}
                numberOfLines={2}
                elipsizeMode="tail">
                {product.name}
              </Text>
            </View>
            {quantityComponent}
          </View>
          {noteComponent}
        </View>
        <TouchableWithoutFeedback
          style={styles.statusTouchable}
          onPress={statusPressHandler}>
          <View style={styles.statusContainer}>
            <View style={styles.statusFinished}>{statusImageComponent}</View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableHighlight>
  );
};

export default React.memo(ProductCompleted);
