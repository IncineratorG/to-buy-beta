import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const ReadListFromMessageView = ({controller}) => {
  const {testButtonHandler} = controller;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.testButtonContainer}>
        <Button title={'Test Button'} onPress={testButtonHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testButtonContainer: {},
});

export default ReadListFromMessageView;
