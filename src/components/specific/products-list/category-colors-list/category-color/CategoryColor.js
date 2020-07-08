import React from 'react';
import {View, Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {SystemEventsHandler} from '../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {icons} from '../../../../../assets/icons';

const CategoryColor = ({colorItem, selectedColorItem, onColorPress}) => {
  const currentColor = colorItem ? colorItem.color : '#FAFAFA';

  const onColorPressHandler = () => {
    if (onColorPress) {
      onColorPress({colorItem});
    }
  };

  const selectedComponent = (
    <View style={[styles.mainContainer, {backgroundColor: currentColor}]}>
      <View style={styles.iconOuterContainer}>
        <View
          style={[styles.iconInnerContainer, {backgroundColor: currentColor}]}>
          <Image style={styles.selectIcon} source={icons.checkmark} />
        </View>
      </View>
    </View>
  );

  const notSelectedComponent = (
    <TouchableWithoutFeedback
      style={styles.mainContainerTouchable}
      onPress={onColorPressHandler}>
      <View style={[styles.mainContainer, {backgroundColor: currentColor}]} />
    </TouchableWithoutFeedback>
  );

  let activeComponent = notSelectedComponent;
  if (selectedColorItem && selectedColorItem.color === colorItem.color) {
    activeComponent = selectedComponent;
  }

  return activeComponent;
};

const styles = StyleSheet.create({
  mainContainerTouchable: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  mainContainer: {
    width: 34,
    height: 34,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: 'red',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconOuterContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInnerContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    padding: 4,
  },
  selectIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
});

export default CategoryColor;
