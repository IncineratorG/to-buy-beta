import React from 'react';
import {View, StyleSheet, TouchableHighlight, Image} from 'react-native';
import {SystemEventsHandler} from '../../../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import UnitsList from './units-list/UnitsList';
import {icons} from '../../../../../../../assets/icons';

const UnitsOption = ({
  state,
  unitsList,
  onUnitPress,
  onUnitLongPress,
  onAddUnitPress,
}) => {
  const addUnitButtonHandler = () => {
    if (onAddUnitPress) {
      onAddUnitPress();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <UnitsList
        unitsList={unitsList}
        selectedUnit={state.selectedUnit}
        onUnitPress={onUnitPress}
        onUnitLongPress={onUnitLongPress}
      />
      <View style={styles.addUnitButtonContainer}>
        <TouchableHighlight
          style={styles.addUnitButtonTouchable}
          onPress={addUnitButtonHandler}>
          <View style={styles.addUnitButton}>
            <Image style={styles.addUnitButtonIcon} source={icons.cross} />
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
  },
  addUnitButtonContainer: {
    width: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addUnitButtonTouchable: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  addUnitButton: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#4a9dec',
    borderRadius: 15,
  },
  addUnitButtonIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    transform: [{rotate: '45deg'}, {scale: 0.6}],
  },
});

export default UnitsOption;
