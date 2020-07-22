import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {icons} from '../../../../assets/icons';
import {useTranslation} from '../../../../utils/common/localization';

const EmptyShoppingListsScreen = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.emptyIconContainer}>
        <Image style={styles.emptyIcon} source={icons.cart} />
      </View>
      <View style={styles.emptyTextContainer}>
        <Text style={styles.emptyHeaderText}>
          {t('EmptyShoppingListsScreen_emptyHeaderText')}
        </Text>
        <Text style={styles.emptyExplanationText}>
          {t('EmptyShoppingListsScreen_emptyExplanationText')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emptyIconContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  emptyTextContainer: {
    margin: 23,
    alignItems: 'center',
  },
  emptyHeaderText: {
    fontSize: 24,
    textAlign: 'center',
  },
  emptyExplanationText: {
    marginTop: 7,
    fontSize: 19,
    textAlign: 'center',
  },
  emptyIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
});

export default EmptyShoppingListsScreen;
