import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import IconButton from '../../../../../common/icon-button/IconButton';
import {useTranslation} from '../../../../../../utils/common/localization';
import {icons} from '../../../../../../assets/icons';

const ProductInputTypes = ({
  onProductNamePress,
  onProductQuantityPress,
  onProductNotePress,
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={styles.inputTypesContainer}
        horizontal={true}
        keyboardShouldPersistTaps={'always'}
        keyboardDismissMode={'none'}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.productNameTypeContainer}>
          <IconButton
            label={t('ProductInputTypes_productNameType')}
            icon={icons.title}
            onPress={onProductNamePress}
          />
        </View>
        <View style={styles.productQuantityTypeContainer}>
          <IconButton
            label={t('ProductInputTypes_productQuantityType')}
            icon={icons.weight}
            onPress={onProductQuantityPress}
          />
        </View>
        <View style={styles.productNoteTypeContainer}>
          <IconButton
            label={t('ProductInputTypes_productNoteType')}
            icon={icons.note}
            onPress={onProductNotePress}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  inputTypesContainer: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  productNameTypeContainer: {
    height: 30,
    backgroundColor: 'transparent',
  },
  productQuantityTypeContainer: {
    height: 30,
    backgroundColor: 'transparent',
    marginLeft: 10,
  },
  productNoteTypeContainer: {
    height: 30,
    backgroundColor: 'transparent',
    marginLeft: 10,
  },
});

export default ProductInputTypes;
