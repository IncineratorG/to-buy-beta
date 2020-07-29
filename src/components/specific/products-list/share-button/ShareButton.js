import React from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {icons} from '../../../../assets/icons';

const ShareButton = ({visible, onClick}) => {
  if (!visible) {
    return null;
  }

  return (
    <TouchableHighlight
      style={styles.touchable}
      onPress={() => {
        if (onClick !== undefined) {
          onClick();
        }
      }}>
      <View style={styles.mainContainer}>
        <Image style={styles.icon} source={icons.share} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#19e680',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  icon: {
    transform: [{scale: 0.8}],
  },
  touchable: {
    borderRadius: 30,
  },
});

export default ShareButton;
