import React from 'react';
import {View, TouchableHighlight, Image, StyleSheet} from 'react-native';
import {icons} from '../../../../../../../../assets/icons';

const ProductMainInputClearInputButton = ({inputEmpty, onClearInput}) => {
  const clearButtonPressHandler = () => {
    if (onClearInput) {
      onClearInput();
    }
  };

  return (
    <View style={styles.clearButtonArea}>
      <View style={styles.clearButtonContainer}>
        <TouchableHighlight
          style={styles.clearButtonTouchable}
          underlayColor={'lightgrey'}
          onPress={inputEmpty ? null : clearButtonPressHandler}>
          <View style={styles.clearButton}>
            <Image style={styles.clearButtonIcon} source={icons.cross_grey} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  clearButtonArea: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  clearButtonTouchable: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 4,
  },
  clearButton: {
    flex: 1,
    alignSelf: 'stretch',
    // backgroundColor: '#19e680',
    borderRadius: 4,
    padding: 2,
  },
  clearButtonIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
});

export default ProductMainInputClearInputButton;
