import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Text} from 'react-native';
import {SystemEventsHandler} from '../../../../../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {useTranslation} from '../../../../../../../../../utils/common/localization';

const UnitsListItem = ({
  onLayout,
  unit,
  selectedUnit,
  onUnitPress,
  onUnitLongPress,
}) => {
  const {t} = useTranslation();

  const unitName = unit.translationMark ? t(unit.translationMark) : unit.name;

  const selectedUnitId = selectedUnit ? selectedUnit.id : -1;

  const unitPressHandler = () => {
    if (onUnitPress) {
      onUnitPress({unit});
    }
  };

  const unitLongPressHandler = () => {
    if (onUnitLongPress) {
      onUnitLongPress({unit});
    }
  };

  const onLayoutHandler = (e) => {
    if (onLayout) {
      onLayout({event: e, unit});
    }
  };

  return (
    <TouchableWithoutFeedback
      onLayout={onLayoutHandler}
      style={styles.touchable}
      onPress={unitPressHandler}
      onLongPress={unitLongPressHandler}>
      <View
        style={[
          styles.mainContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderColor: 'lightgrey',
            backgroundColor: unit.id === selectedUnitId ? 'lightgrey' : 'white',
          },
        ]}>
        <Text style={[styles.typeTitle]}>{unitName}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    minWidth: 50,
  },
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    minWidth: 50,
  },
  typeTitle: {
    margin: 5,
  },
});

export default UnitsListItem;
