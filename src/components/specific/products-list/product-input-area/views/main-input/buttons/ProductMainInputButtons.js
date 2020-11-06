import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableHighlight, Image, StyleSheet} from 'react-native';
import {SystemEventsHandler} from '../../../../../../../utils/common/system-events-handler/SystemEventsHandler';
import ProductMainInputVoiceInputButton from './voice-input-button/ProductMainInputVoiceInputButton';
import ProductMainInputConfirmButton from './confirm-button/ProductMainInputConfirmButton';

const ProductMainInputButtons = ({correctInput, canShowVoiceInput}) => {
  const [voiceInputButtonVisible, setVoiceInputButtonVisible] = useState(false);
  const [voiceInputServiceAvailable, setVoiceInputServiceAvailable] = useState(
    false,
  );

  const voiceInputAvailabilityChangeHandler = (isAvailable) => {
    SystemEventsHandler.onInfo({
      info: 'voiceInputAvailabilityChangeHandler(): ' + isAvailable,
    });
    setVoiceInputServiceAvailable(isAvailable);
  };

  const voiceInputButtonComponent = voiceInputButtonVisible ? (
    <ProductMainInputVoiceInputButton
      voiceInputAvailabilityChangeHandler={voiceInputAvailabilityChangeHandler}
    />
  ) : null;
  const confirmButtonComponent = (
    <ProductMainInputConfirmButton correctInput={correctInput} />
  );

  useEffect(() => {
    if (canShowVoiceInput && voiceInputServiceAvailable) {
      setVoiceInputButtonVisible(true);
    } else {
      setVoiceInputButtonVisible(false);
    }
  }, [canShowVoiceInput, voiceInputServiceAvailable]);

  return (
    <View
      style={[
        styles.buttonsContainer,
        {width: voiceInputButtonVisible ? 100 : 50},
      ]}>
      {voiceInputButtonComponent}
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
    backgroundColor: 'green',
  },
});

export default ProductMainInputButtons;
