import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import {icons} from '../../../../../../assets/icons';
import {useTranslation} from '../../../../../../utils/common/localization';
import ProductInputType from '../../stores/types/productInputAreaProductInputTypes';
import {SystemEventsHandler} from '../../../../../../utils/common/system-events-handler/SystemEventsHandler';
import Voice from '@react-native-community/voice';
import ProductMainInputButtons from './buttons/ProductMainInputButtons';

const ProductMainInput = ({
  state,
  unitsList,
  categoriesList,
  onConfirmPress,
  onChangeText,
  onMakeProductsSuggestion,
}) => {
  const [canShowVoiceInput, setCanShowVoiceInput] = useState(false);

  const {
    keyboardType,
    icon,
    placeholder,
    type,
    values,
    selectedCategory,
    selectedUnit,
  } = state.currentInput;

  let textInputValue = '';
  switch (type) {
    case ProductInputType.PRODUCT_NAME: {
      textInputValue = values.productName;
      break;
    }

    case ProductInputType.QUANTITY: {
      textInputValue = values.quantity;
      break;
    }

    case ProductInputType.NOTE: {
      textInputValue = values.note;
      break;
    }
  }

  // const voiceInputIconActive = icons.microphone_black;
  // const voiceInputIconNonActive = icons.microphone_grey;

  // const [voiceInputIcon, setVoiceInputIcon] = useState(voiceInputIconNonActive);
  // const [voiceInputMode, setVoiceInputMode] = useState(false);
  // const [hasAudioRecordPermission, setHasAudioRecordPermission] = useState(
  //   false,
  // );
  // const [
  //   hasSpeechRecognitionService,
  //   setHasSpeechRecognitionService,
  // ] = useState(false);

  const mainTextInputRef = useRef(null);

  const {t} = useTranslation();

  const onSubmitEditing = () => {
    // SystemEventsHandler.onInfo({info: 'onSubmitEditing()'});

    if (values.acceptable && onConfirmPress) {
      const {productName, quantity: productQuantity, note} = values;

      const quantity = productQuantity ? productQuantity : '1';

      let unitId = selectedUnit ? selectedUnit.id : -1;
      if (unitId === -1) {
        const defaultUnitsList = unitsList.filter((u) => u.default);
        if (defaultUnitsList.length) {
          unitId = defaultUnitsList[0].id;
        }
      }

      let categoryId = selectedCategory ? selectedCategory.id : -1;
      if (categoryId === -1) {
        const defaultCategoriesList = categoriesList.filter((c) => c.default);
        if (defaultCategoriesList.length) {
          categoryId = defaultCategoriesList[0].id;
        }
      }

      onConfirmPress({productName, quantity, note, unitId, categoryId});
    }
  };

  // const voiceInputButtonPressHandler = () => {
  //   // SystemEventsHandler.onInfo({info: 'voiceInputButtonPressHandler()'});
  //
  //   if (voiceInputMode) {
  //     setVoiceInputMode(!voiceInputMode);
  //     setVoiceInputIcon(voiceInputIconNonActive);
  //   } else {
  //     setVoiceInputMode(!voiceInputMode);
  //     setVoiceInputIcon(voiceInputIconActive);
  //   }
  // };

  const changeTextHandler = (text) => {
    if (onChangeText) {
      onChangeText({text, inputType: type});
    }

    if (type === ProductInputType.PRODUCT_NAME) {
      onMakeProductsSuggestion({partialProductName: text});
    }
  };

  const buttonsComponent = (
    <ProductMainInputButtons
      correctInput={values.acceptable}
      canShowVoiceInput={canShowVoiceInput}
    />
  );

  useEffect(() => {
    setTimeout(() => {
      if (mainTextInputRef != null && mainTextInputRef.current != null) {
        mainTextInputRef.current.focus();
      }
    }, 500);
  }, []);

  useEffect(() => {
    switch (type) {
      case ProductInputType.PRODUCT_NAME: {
        setCanShowVoiceInput(true);
        break;
      }

      case ProductInputType.QUANTITY: {
        setCanShowVoiceInput(false);
        break;
      }

      case ProductInputType.NOTE: {
        setCanShowVoiceInput(true);
        break;
      }
    }
  }, [type]);

  // useEffect(() => {
  //   const getSpeechRecognitionServices = async () => {
  //     const services = await Voice.getSpeechRecognitionServices();
  //
  //     let hasService = false;
  //     for (let i = 0; i < services.length; ++i) {
  //       const service = services[i];
  //       if (service === 'com.google.android.googlequicksearchbox') {
  //         setHasSpeechRecognitionService(true);
  //         break;
  //       }
  //     }
  //   };
  //
  //   getSpeechRecognitionServices();
  // }, []);

  // useEffect(() => {
  //   function onSpeechStart(e) {}
  //   function onSpeechResults(e) {}
  //   function onSpeechPartialResults(e) {}
  //   function onSpeechEnd(e) {}
  //   // function onSpeechError(e) {
  //   // }
  //
  //   Voice.onSpeechEnd = onSpeechEnd;
  //   // Voice.onSpeechError = onSpeechError;
  //   Voice.onSpeechResults = onSpeechResults;
  //   Voice.onSpeechPartialResults = onSpeechPartialResults;
  //
  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  /*
        <View style={styles.buttonsContainer}>
        <View style={styles.voiceInputButtonArea}>
          <View style={styles.voiceInputButtonContainer}>
            <TouchableHighlight
              style={styles.voiceInputButtonTouchable}
              underlayColor={'lightgrey'}
              onPress={voiceInputButtonPressHandler}>
              <View style={styles.voiceInputButton}>
                <Image
                  style={styles.voiceInputButtonIcon}
                  source={voiceInputIcon}
                />
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.confirmButtonArea}>
          <View style={styles.confirmButtonContainer}>
            <TouchableHighlight
              style={styles.confirmButtonTouchable}
              onPress={values.acceptable ? onSubmitEditing : null}>
              <View
                style={[
                  styles.confirmButton,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {backgroundColor: values.acceptable ? '#17cf73' : '#CCCCCC'},
                ]}>
                <Image
                  style={styles.confirmButtonIcon}
                  source={icons.checkmark}
                />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
   */

  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        <View style={styles.iconWrapper}>
          <Image style={styles.icon} source={icon} />
        </View>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          ref={mainTextInputRef}
          value={textInputValue}
          // autoFocus={true}
          keyboardType={keyboardType}
          blurOnSubmit={false}
          placeholder={t(placeholder)}
          fontSize={18}
          onSubmitEditing={onSubmitEditing}
          onChangeText={changeTextHandler}
        />
      </View>
      {buttonsComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: 30,
    backgroundColor: 'transparent',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
  },
  icon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    marginLeft: 10,
    marginRight: 10,
  },
  // buttonsContainer: {
  //   width: 100,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  // },
  // voiceInputButtonArea: {
  //   flex: 1,
  //   alignSelf: 'stretch',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // voiceInputButtonContainer: {
  //   width: 30,
  //   height: 30,
  // },
  // voiceInputButtonTouchable: {
  //   flex: 1,
  //   alignSelf: 'stretch',
  //   borderRadius: 15,
  // },
  // voiceInputButton: {
  //   flex: 1,
  //   alignSelf: 'stretch',
  //   borderRadius: 15,
  // },
  // voiceInputButtonIcon: {
  //   flex: 1,
  //   width: undefined,
  //   height: undefined,
  //   resizeMode: 'contain',
  // },
  // confirmButtonArea: {
  //   flex: 1,
  //   alignSelf: 'stretch',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // confirmButtonContainer: {
  //   width: 30,
  //   height: 30,
  //   borderRadius: 4,
  // },
  // confirmButtonTouchable: {
  //   flex: 1,
  //   alignSelf: 'stretch',
  //   borderRadius: 4,
  // },
  // confirmButton: {
  //   flex: 1,
  //   alignSelf: 'stretch',
  //   backgroundColor: '#19e680',
  //   borderRadius: 4,
  //   padding: 6,
  // },
  // confirmButtonIcon: {
  //   flex: 1,
  //   width: undefined,
  //   height: undefined,
  //   resizeMode: 'contain',
  // },
});

export default ProductMainInput;

// import React, {useEffect, useRef} from 'react';
// import {
//   View,
//   TouchableHighlight,
//   Image,
//   TextInput,
//   StyleSheet,
// } from 'react-native';
// import {icons} from '../../../../../../assets/icons';
// import {useTranslation} from '../../../../../../utils/common/localization';
// import ProductInputType from '../../stores/types/productInputAreaProductInputTypes';
// import {SystemEventsHandler} from '../../../../../../utils/common/system-events-handler/SystemEventsHandler';
//
// const ProductMainInput = ({
//   state,
//   unitsList,
//   categoriesList,
//   onConfirmPress,
//   onChangeText,
//   onMakeProductsSuggestion,
// }) => {
//   const {
//     keyboardType,
//     icon,
//     placeholder,
//     type,
//     values,
//     selectedCategory,
//     selectedUnit,
//   } = state.currentInput;
//
//   let textInputValue = '';
//   switch (type) {
//     case ProductInputType.PRODUCT_NAME: {
//       textInputValue = values.productName;
//       break;
//     }
//
//     case ProductInputType.QUANTITY: {
//       textInputValue = values.quantity;
//       break;
//     }
//
//     case ProductInputType.NOTE: {
//       textInputValue = values.note;
//       break;
//     }
//   }
//
//   const mainTextInputRef = useRef(null);
//
//   const {t} = useTranslation();
//
//   const onSubmitEditing = () => {
//     if (values.acceptable && onConfirmPress) {
//       const {productName, quantity: productQuantity, note} = values;
//
//       const quantity = productQuantity ? productQuantity : '1';
//
//       let unitId = selectedUnit ? selectedUnit.id : -1;
//       if (unitId === -1) {
//         const defaultUnitsList = unitsList.filter((u) => u.default);
//         if (defaultUnitsList.length) {
//           unitId = defaultUnitsList[0].id;
//         }
//       }
//
//       let categoryId = selectedCategory ? selectedCategory.id : -1;
//       if (categoryId === -1) {
//         const defaultCategoriesList = categoriesList.filter((c) => c.default);
//         if (defaultCategoriesList.length) {
//           categoryId = defaultCategoriesList[0].id;
//         }
//       }
//
//       onConfirmPress({productName, quantity, note, unitId, categoryId});
//     }
//   };
//
//   const changeTextHandler = (text) => {
//     if (onChangeText) {
//       onChangeText({text, inputType: type});
//     }
//
//     if (type === ProductInputType.PRODUCT_NAME) {
//       onMakeProductsSuggestion({partialProductName: text});
//     }
//   };
//
//   useEffect(() => {
//     setTimeout(() => {
//       if (mainTextInputRef != null && mainTextInputRef.current != null) {
//         mainTextInputRef.current.focus();
//       }
//     }, 500);
//   }, []);
//
//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.iconContainer}>
//         <View style={styles.iconWrapper}>
//           <Image style={styles.icon} source={icon} />
//         </View>
//       </View>
//       <View style={styles.textInputContainer}>
//         <TextInput
//           ref={mainTextInputRef}
//           value={textInputValue}
//           // autoFocus={true}
//           keyboardType={keyboardType}
//           blurOnSubmit={false}
//           placeholder={t(placeholder)}
//           fontSize={18}
//           onSubmitEditing={onSubmitEditing}
//           onChangeText={changeTextHandler}
//         />
//       </View>
//       <View style={styles.confirmButtonContainer}>
//         <TouchableHighlight
//           style={styles.confirmButtonTouchable}
//           onPress={values.acceptable ? onSubmitEditing : null}>
//           <View
//             style={[
//               styles.confirmButton,
//               // eslint-disable-next-line react-native/no-inline-styles
//               {backgroundColor: values.acceptable ? '#17cf73' : '#CCCCCC'},
//             ]}>
//             <Image style={styles.confirmButtonIcon} source={icons.checkmark} />
//           </View>
//         </TouchableHighlight>
//       </View>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//   },
//   iconContainer: {
//     width: 30,
//     backgroundColor: 'transparent',
//     marginLeft: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   iconWrapper: {
//     height: 30,
//     width: 30,
//     backgroundColor: 'transparent',
//   },
//   icon: {
//     flex: 1,
//     width: undefined,
//     height: undefined,
//     resizeMode: 'contain',
//   },
//   textInputContainer: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   confirmButtonContainer: {
//     width: 50,
//     backgroundColor: 'transparent',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   confirmButtonTouchable: {
//     width: 30,
//     height: 30,
//     borderRadius: 4,
//   },
//   confirmButton: {
//     flex: 1,
//     alignSelf: 'stretch',
//     backgroundColor: '#19e680',
//     borderRadius: 4,
//     padding: 6,
//   },
//   confirmButtonIcon: {
//     flex: 1,
//     width: undefined,
//     height: undefined,
//     resizeMode: 'contain',
//   },
// });
//
// export default ProductMainInput;
