import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableHighlight, Image, StyleSheet} from 'react-native';
import {icons} from '../../../../../../../../assets/icons';
import {SystemEventsHandler} from '../../../../../../../../utils/common/system-events-handler/SystemEventsHandler';

const ProductMainInputConfirmButton = ({correctInput}) => {
  const submitEditingHandler = () => {
    SystemEventsHandler.onInfo({info: 'submitEditingHandler()'});
  };

  return (
    <View style={styles.confirmButtonArea}>
      <View style={styles.confirmButtonContainer}>
        <TouchableHighlight
          style={styles.confirmButtonTouchable}
          onPress={correctInput ? submitEditingHandler : null}>
          <View
            style={[
              styles.confirmButton,
              // eslint-disable-next-line react-native/no-inline-styles
              {backgroundColor: correctInput ? '#17cf73' : '#CCCCCC'},
            ]}>
            <Image style={styles.confirmButtonIcon} source={icons.checkmark} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmButtonArea: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  confirmButtonTouchable: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 4,
  },
  confirmButton: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#19e680',
    borderRadius: 4,
    padding: 6,
  },
  confirmButtonIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
});

export default ProductMainInputConfirmButton;
