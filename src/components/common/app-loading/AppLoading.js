import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {icons} from '../../../assets/icons';

const AppLoading = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconOuterContainer}>
        <View style={styles.iconInnerContainer}>
          <Image
            style={styles.appIcon}
            // resizeMode="contain"
            source={icons.app_icon}
          />
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
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    borderColor: '#c7ede6',
    borderWidth: 1,
    elevation: 4,
  },
  appIcon: {
    transform: [{scale: 0.8}],
  },
  nameOuterContainer: {
    height: 50,
  },
  nameInnerContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    color: 'lightgrey',
  },
});

export default AppLoading;

// import React from 'react';
// import {StyleSheet, View, Text, Image} from 'react-native';
// import {icons} from '../../../assets/icons';
//
// const AppLoading = () => {
//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.iconOuterContainer}>
//         <View style={styles.iconInnerContainer}>
//           <Image style={styles.appIcon} source={icons.app_icon} />
//         </View>
//       </View>
//       <View style={styles.nameOuterContainer}>
//         <View style={styles.nameInnerContainer}>
//           <Text style={styles.appName}>ToBuy.Beta</Text>
//         </View>
//       </View>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//   },
//   iconOuterContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   iconInnerContainer: {
//     width: 50,
//     height: 50,
//     // backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   appIcon: {
//     // transform: [{scale: 1.0}],
//   },
//   nameOuterContainer: {
//     height: 50,
//     // backgroundColor: 'yellow',
//   },
//   nameInnerContainer: {
//     flex: 1,
//     // alignSelf: 'stretch',
//     margin: 8,
//     // backgroundColor: 'grey',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   appName: {
//     color: 'lightgrey',
//   },
// });
//
// export default AppLoading;
