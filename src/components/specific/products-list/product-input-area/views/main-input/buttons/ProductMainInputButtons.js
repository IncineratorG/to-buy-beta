import React from 'react';
import {View, StyleSheet} from 'react-native';
import ProductMainInputConfirmButton from './confirm-button/ProductMainInputConfirmButton';
import ProductMainInputClearInputButton from './clear-input-button/ProductMainInputClearInputButton';

const ProductMainInputButtons = ({
  correctInput,
  inputEmpty,
  onSubmitEditing,
  onClearInput,
}) => {
  const clearButtonComponent = inputEmpty ? null : (
    <ProductMainInputClearInputButton
      inputEmpty={inputEmpty}
      onClearInput={onClearInput}
    />
  );
  const confirmButtonComponent = (
    <ProductMainInputConfirmButton
      correctInput={correctInput}
      onSubmitEditing={onSubmitEditing}
    />
  );

  return (
    <View style={[styles.buttonsContainer, {width: inputEmpty ? 50 : 100}]}>
      {clearButtonComponent}
      {confirmButtonComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default ProductMainInputButtons;
