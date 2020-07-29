import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
} from 'react-native';
import {SystemEventsHandler} from '../../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
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
}) => {
  const {t} = useTranslation();

  const [menuVisible, setMenuVisible] = useState(false);

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
    if (onStatusPress) {
      onStatusPress(product);
    }
  };

  const menuPressHandler = () => {
    setMenuVisible(!menuVisible);
  };

  const editPressHandler = () => {
    if (onProductPress) {
      onProductPress(product);
    }
    setMenuVisible(false);
  };

  const removePressHandler = () => {
    if (onProductLongPress) {
      onProductLongPress(product);
    }
    setMenuVisible(false);
  };

  const markAsBoughtPressHandler = () => {
    if (onStatusPress) {
      onStatusPress(product);
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

  const menuComponent = (
    <Menu opened={menuVisible} onBackdropPress={menuPressHandler}>
      <MenuTrigger text="" />
      <MenuOptions>
        <MenuOption
          onSelect={markAsBoughtPressHandler}
          text={t('ProductNotCompleted_menuMarkAsBoughtOption')}
        />
        <MenuOption
          onSelect={editPressHandler}
          text={t('ProductNotCompleted_menuEditOption')}
        />
        <MenuOption
          onSelect={removePressHandler}
          text={t('ProductNotCompleted_menuRemoveOption')}
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
            <View style={styles.statusNotFinished} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableHighlight>
  );
};

export default React.memo(ProductNotCompleted);

// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableWithoutFeedback,
//   TouchableHighlight,
// } from 'react-native';
// import {SystemEventsHandler} from '../../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
//
// const ProductNotCompleted = ({
//   styles,
//   product,
//   categoriesMap,
//   unitsMap,
//   onStatusPress,
//   onProductPress,
//   onProductLongPress,
// }) => {
//   const categoryDescription = categoriesMap.get(product.categoryId);
//   const categoryColor = categoryDescription
//     ? categoryDescription.color
//     : 'lightgrey';
//
//   const productUnit = unitsMap.get(product.unitId)
//     ? unitsMap.get(product.unitId).name
//     : '';
//
//   const productPressHandler = () => {
//     if (onProductPress) {
//       onProductPress(product);
//     }
//   };
//
//   const productLongPressHandler = () => {
//     if (onProductLongPress) {
//       onProductLongPress(product);
//     }
//   };
//
//   const statusPressHandler = () => {
//     onStatusPress(product);
//   };
//
//   const noteExistComponent = (
//     <View style={styles.noteContainer}>
//       <Text style={styles.note}>{product.note}</Text>
//     </View>
//   );
//
//   const noteNotExistComponent = <View />;
//
//   const noteComponent =
//     product.note.length > 0 ? noteExistComponent : noteNotExistComponent;
//
//   return (
//     <TouchableHighlight
//       style={styles.touchable}
//       underlayColor={categoryColor}
//       onPress={productPressHandler}
//       onLongPress={productLongPressHandler}>
//       <View style={[styles.mainContainer, {borderColor: categoryColor}]}>
//         <View
//           style={[styles.colorComponent, {backgroundColor: categoryColor}]}
//         />
//         <View style={styles.infoContainer}>
//           <View style={styles.majorInfoContainer}>
//             <View style={styles.productNameContainer}>
//               <Text
//                 style={styles.productName}
//                 numberOfLines={4}
//                 elipsizeMode="tail">
//                 {product.name}
//               </Text>
//             </View>
//             <View style={styles.quantityContainer}>
//               <View style={styles.quantityCountContainer}>
//                 <Text style={styles.quantityCount} numberOfLines={1}>
//                   {product.quantity}
//                 </Text>
//               </View>
//               <View style={styles.quantityUnitContainer}>
//                 <Text style={styles.quantityUnit} numberOfLines={1}>
//                   {productUnit}
//                 </Text>
//               </View>
//             </View>
//           </View>
//           {noteComponent}
//         </View>
//         <TouchableWithoutFeedback
//           style={styles.statusTouchable}
//           onPress={statusPressHandler}>
//           <View style={styles.statusContainer}>
//             <View style={styles.statusNotFinished} />
//           </View>
//         </TouchableWithoutFeedback>
//       </View>
//     </TouchableHighlight>
//   );
// };
//
// export default React.memo(ProductNotCompleted);
