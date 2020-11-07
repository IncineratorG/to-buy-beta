import React from 'react';
import {View, TouchableHighlight, StyleSheet, Image} from 'react-native';

const ShareOption = ({icon, iconStyles, onOptionPress}) => {
  return (
    <View style={styles.optionArea}>
      <TouchableHighlight
        style={styles.optionTouchable}
        onPress={onOptionPress}
        underlayColor={'lightgrey'}>
        <View style={styles.optionIconContainer}>
          <Image style={iconStyles} source={icon} />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  optionArea: {
    height: 60,
    borderRadius: 30,
  },
  optionTouchable: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 30,
  },
  optionIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIcon: {
    transform: [{scale: 0.9}],
  },
});

export default ShareOption;
