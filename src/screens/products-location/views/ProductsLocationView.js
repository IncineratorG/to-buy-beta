import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

const ProductsLocationView = ({styles, model, controller}) => {
  const {state, productsLocationUri} = model.data;
  const {locationPermissionsGranted, coords} = state;
  const {latitude, longitude} = coords;

  // const customUri =
  //   'https://yandex.ru/maps/?ll=' + longitude + ',' + latitude + '&z=16';

  let customUri =
    longitude && latitude
      ? 'https://yandex.ru/maps/?ll=' + longitude + ',' + latitude + '&z=16'
      : 'https://yandex.ru/maps/?ll=30.310182,59.951059&z=16&text=кафе%20с%20wi-fi';

  const uri =
    'https://yandex.ru/maps/?ll=30.310182,59.951059&z=16&text=кафе%20с%20wi-fi';
  const uri2 =
    'https://www.google.ru/maps/search/%D1%8D%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D0%BD%D0%B8%D0%BA%D0%B0/@55.8582305,37.4200327,16z';

  // if (!locationPermissionsGranted) {
  //   return null;
  // }

  if (!productsLocationUri) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      <WebView source={{uri: productsLocationUri}} />
    </View>
  );
};

export default ProductsLocationView;
