import React from 'react';
import {View, Text, TouchableHighlight, Image, StyleSheet} from 'react-native';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {icons} from '../../../assets/icons';

const IconButton = ({icon, label, onPress}) => {
  const onPressHandler = () => {
    // SystemEventsHandler.onInfo({info: 'IconButton->onPessHandler()'});
    if (onPress) {
      onPress();
    }
  };

  if (!label) {
    label = 'Button';
  }

  if (!icon) {
    icon = icons.empty;
  }

  return (
    <TouchableHighlight
      style={styles.touchable}
      underlayColor={'black'}
      onPress={onPressHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={icon} />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label} numberOfLines={1} ellipsizeMode={'tail'}>
            {label}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 4,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: '#CCCCCC',
    borderRadius: 4,
  },
  iconContainer: {
    marginLeft: 5,
    backgroundColor: 'transparent',
    width: 20,
  },
  icon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  labelContainer: {
    flex: 4,
    backgroundColor: 'transparent',
  },
  label: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default IconButton;
