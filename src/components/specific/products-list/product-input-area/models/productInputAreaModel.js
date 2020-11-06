import {useState, useEffect, useReducer} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Keyboard} from 'react-native';
import productInputAreaReducer from '../stores/productInputAreaReducer';
import productInputAreaState from '../stores/productInputAreaState';
import {
  piaa_hideInputArea,
  piaa_setCategory,
  piaa_setPredefinedData,
  piaa_setPredefinedState,
  piaa_setProductSuggestions,
  piaa_setUnit,
  piaa_setVoiceInputServiceAvailability,
} from '../stores/productInputAreaActions';
import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';
import {clearProductSuggestionsAction} from '../../../../../store/actions/product-suggestion/productSuggestionActions';
import Voice from '@react-native-community/voice';

export const useProductInputAreaModel = ({
  onInputAreaHide,
  onAddCategoryPress,
  onCategoryLongPress,
  onAddUnitPress,
  onUnitLongPress,
  onSubmit,
  predefinedData,
  predefinedState,
  categoriesList,
  categoriesMap,
  allCategoriesMap,
  unitsList,
  unitsMap,
  allUnitsMap,
}) => {
  const [extendedUnitsList, setExtendedUnitsList] = useState(null);
  const [extendedCategoriesList, setExtendedCategoriesList] = useState(null);

  const [state, localDispatch] = useReducer(
    productInputAreaReducer,
    productInputAreaState,
  );

  const dispatch = useDispatch();

  const productSuggestions = useSelector(
    (appState) => appState.productSuggestion.productSuggestions.suggestions,
  );

  useEffect(() => {
    dispatch(clearProductSuggestionsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const keyboardHideHandler = () => {
      localDispatch(piaa_hideInputArea());

      if (onInputAreaHide) {
        onInputAreaHide({inputAreaState: state});
      }
    };

    Keyboard.addListener('keyboardDidHide', keyboardHideHandler);
    return () => {
      Keyboard.removeListener('keyboardDidHide', keyboardHideHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (predefinedState) {
      const {currentInput} = predefinedState;
      if (currentInput) {
        const {selectedUnit, selectedCategory} = currentInput;
        if (selectedUnit) {
          if (!unitsMap.has(selectedUnit.id)) {
            const customUnitsList = [...unitsList];
            customUnitsList.unshift(selectedUnit);
            setExtendedUnitsList(customUnitsList);
          } else {
            setExtendedUnitsList(null);
          }
        }
        if (selectedCategory) {
          if (!categoriesMap.has(selectedCategory.id)) {
            const customCategoriesList = [...categoriesList];
            customCategoriesList.unshift(selectedCategory);
            setExtendedCategoriesList(customCategoriesList);
          } else {
            setExtendedCategoriesList(null);
          }
        }
      }

      localDispatch(piaa_setPredefinedState({state: predefinedState}));
    } else if (predefinedData) {
      const {name, quantity, note, unitId, categoryId} = predefinedData;
      let unit = unitsMap.get(unitId);
      let category = categoriesMap.get(categoryId);

      if (!unit) {
        unit = allUnitsMap.get(unitId);
        const customUnitsList = [...unitsList];
        customUnitsList.unshift(unit);
        setExtendedUnitsList(customUnitsList);
      } else {
        setExtendedUnitsList(null);
      }
      if (!category) {
        category = allCategoriesMap.get(categoryId);
        const customCategoriesList = [...categoriesList];
        customCategoriesList.unshift(category);
        setExtendedCategoriesList(customCategoriesList);
      } else {
        setExtendedCategoriesList(null);
      }

      localDispatch(
        piaa_setPredefinedData({name, quantity, note, unit, category}),
      );
    } else {
      let defaultUnit;
      const defaultUnitsList = unitsList.filter((u) => u.default);
      if (defaultUnitsList.length) {
        defaultUnit = defaultUnitsList[0];
      }

      let defaultCategory;
      const defaultCategoriesList = categoriesList.filter((c) => c.default);
      if (defaultCategoriesList.length) {
        defaultCategory = defaultCategoriesList[0];
      }

      localDispatch(piaa_setUnit({unit: defaultUnit}));
      localDispatch(piaa_setCategory({category: defaultCategory}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [predefinedState, predefinedData]);

  useEffect(() => {
    localDispatch(
      piaa_setProductSuggestions({suggestions: productSuggestions}),
    );
  }, [productSuggestions]);

  useEffect(() => {
    if (extendedCategoriesList) {
      const extraCategory = extendedCategoriesList[0];
      const customCategoriesList = [...categoriesList];
      customCategoriesList.unshift(extraCategory);
      setExtendedCategoriesList(customCategoriesList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesList]);

  useEffect(() => {
    if (extendedUnitsList) {
      const extraUnit = extendedUnitsList[0];
      const customUnitsList = [...unitsList];
      customUnitsList.unshift(extraUnit);
      setExtendedUnitsList(customUnitsList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitsList]);

  // useEffect(() => {
  //   const getSpeechRecognitionServices = async () => {
  //     const services = await Voice.getSpeechRecognitionServices();
  //
  //     let hasService = false;
  //     for (let i = 0; i < services.length; ++i) {
  //       const service = services[i];
  //       if (service === 'com.google.android.googlequicksearchbox') {
  //         hasService = true;
  //         break;
  //       }
  //     }
  //
  //     localDispatch(
  //       piaa_setVoiceInputServiceAvailability({isAvailable: hasService}),
  //     );
  //   };
  //
  //   getSpeechRecognitionServices();
  // }, []);

  return {
    data: {
      state,
      categoriesList,
      categoriesMap,
      extendedCategoriesList,
      unitsList,
      unitsMap,
      extendedUnitsList,
    },
    setters: {},
    externalHandlers: {
      onInputAreaHide,
      onAddCategoryPress,
      onCategoryLongPress,
      onAddUnitPress,
      onUnitLongPress,
      onSubmit,
    },
    localDispatch,
    dispatch,
  };
};
