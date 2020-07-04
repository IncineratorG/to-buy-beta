import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {icons} from '../../../assets/icons';

const AppLoading = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconOuterContainer}>
        <View style={styles.iconInnerContainer}>
          <Image style={styles.appIcon} source={icons.app_icon} />
        </View>
      </View>
      <View style={styles.nameOuterContainer}>
        <View style={styles.nameInnerContainer}>
          <Text style={styles.appName}>ToBuy.Beta</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  iconOuterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInnerContainer: {
    width: 50,
    height: 50,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIcon: {
    transform: [{scale: 1.0}],
  },
  nameOuterContainer: {
    height: 50,
    // backgroundColor: 'yellow',
  },
  nameInnerContainer: {
    flex: 1,
    // alignSelf: 'stretch',
    margin: 8,
    // backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    color: 'lightgrey',
  },
});

export default AppLoading;
