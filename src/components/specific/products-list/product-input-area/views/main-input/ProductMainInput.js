import React from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import {icons} from '../../../../../../assets/icons';
import {SystemEventsHandler} from '../../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {useTranslation} from '../../../../../common/localization';
import ProductInputType from '../../stores/types/productInputAreaProductInputTypes';

const ProductMainInput = ({state, onConfirmPress, onChangeText}) => {
  const {keyboardType, icon, placeholder, type, values} = state.currentInput;

  let currentValue = '';
  switch (type) {
    case ProductInputType.PRODUCT_NAME: {
      currentValue = values.productName;
      break;
    }

    case ProductInputType.QUANTITY: {
      currentValue = values.quantity;
      break;
    }

    case ProductInputType.NOTE: {
      currentValue = values.note;
      break;
    }
  }

  const {t} = useTranslation();

  const onSubmitEditing = () => {
    if (onConfirmPress) {
      onConfirmPress();
    }
  };

  const changeTextHandler = (text) => {
    if (onChangeText) {
      onChangeText({text, inputType: type});
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        <View style={styles.iconWrapper}>
          <Image style={styles.icon} source={icon} />
        </View>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          value={currentValue}
          autoFocus={true}
          keyboardType={keyboardType}
          blurOnSubmit={false}
          placeholder={t(placeholder)}
          fontSize={18}
          onSubmitEditing={onSubmitEditing}
          onChangeText={changeTextHandler}
        />
      </View>
      <View style={styles.confirmButtonContainer}>
        <TouchableHighlight
          style={styles.confirmButtonTouchable}
          onPress={onConfirmPress}>
          <View style={styles.confirmButton}>
            <Image style={styles.confirmButtonIcon} source={icons.arrow_up} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: 30,
    backgroundColor: 'transparent',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
  },
  icon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    marginLeft: 10,
    marginRight: 10,
  },
  confirmButtonContainer: {
    width: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonTouchable: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  confirmButton: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#304FFE',
    borderRadius: 4,
    padding: 4,
  },
  confirmButtonIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
});

export default ProductMainInput;
