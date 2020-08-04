import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import {icons} from '../../../../../../assets/icons';

const ProductCompleted = ({
  styles,
  unitsMap,
  product,
  onStatusPress,
  onProductLongPress,
}) => {
  const {confirmationStatus} = product;
  let awaitConfirmation = false;
  let confirmed = false;

  if (confirmationStatus) {
    awaitConfirmation = confirmationStatus.awaitConfirmation;
    confirmed = confirmationStatus.confirmed;
  }

  const productUnit = unitsMap.get(product.unitId)
    ? unitsMap.get(product.unitId).name
    : '';

  const statusPressHandler = () => {
    onStatusPress(product);
  };

  const productLongPressHandler = () => {
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
            <View style={styles.quantityContainer}>
              <View style={styles.quantityCountContainer}>
                <Text style={styles.quantityCount} numberOfLines={1}>
                  {product.quantity}
                </Text>
              </View>
              <View style={styles.quantityUnitContainer}>
                <Text style={styles.quantityUnit} numberOfLines={1}>
                  {productUnit}
                </Text>
              </View>
            </View>
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
