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

const ProductMainInput = ({onConfirmPress, state}) => {
  const {keyboardType, icon} = state.currentInput;

  const placeholder = 'Placeholder';

  const onSubmitEditing = () => {
    SystemEventsHandler.onInfo({info: 'onSubmitEditing'});
  };

  const onChangeText = () => {
    SystemEventsHandler.onInfo({info: 'onChangeText'});
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
          autoFocus={true}
          keyboardType={keyboardType}
          blurOnSubmit={false}
          placeholder={placeholder}
          fontSize={18}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
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
