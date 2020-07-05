import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';

const AddCategoryDialog = ({visible, onTouchOutside}) => {
  return (
    <Dialog
      visible={visible}
      title="Custom Dialog"
      onTouchOutside={onTouchOutside}>
      <View style={styles.mainContainer}>
        <View />
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'stretch',
    height: 100,
    backgroundColor: 'grey',
  },
});

export default AddCategoryDialog;
