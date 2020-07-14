import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import {SystemEventsHandler} from '../../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import ProductInitialCategories from '../../../product-initial-categories/ProductInitialCategories';

const ProductNotCompleted = ({
  styles,
  product,
  categoriesMap,
  unitsMap,
  selectedCategoriesIds,
  onStatusPress,
  onProductPress,
  onProductLongPress,
}) => {
  if (
    !selectedCategoriesIds.has(ProductInitialCategories.ALL) &&
    !selectedCategoriesIds.has(ProductInitialCategories.NOT_COMPLETED) &&
    !selectedCategoriesIds.has(product.categoryId)
  ) {
    return null;
  }

  const categoryDescription = categoriesMap.get(product.categoryId);
  const categoryColor = categoryDescription
    ? categoryDescription.color
    : 'lightgrey';

  const productUnit = unitsMap.get(product.unitId)
    ? unitsMap.get(product.unitId).name
    : '';

  const productPressHandler = () => {
    if (onProductPress) {
      onProductPress(product);
    }
  };

  const productLongPressHandler = () => {
    if (onProductLongPress) {
      onProductLongPress(product);
    }
  };

  const statusPressHandler = () => {
    onStatusPress(product);
  };

  const noteExistComponent = (
    <View style={styles.noteContainer}>
      <Text style={styles.note}>{product.note}</Text>
    </View>
  );

  const noteNotExistComponent = <View />;

  const noteComponent =
    product.note.length > 0 ? noteExistComponent : noteNotExistComponent;

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
            <View style={styles.statusNotFinished} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableHighlight>
  );
};

export default React.memo(ProductNotCompleted);
