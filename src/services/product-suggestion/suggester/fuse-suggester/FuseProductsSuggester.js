import Fuse from 'fuse.js';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

class FuseProductsSuggester {
  static #fuse;
  static #productsNameSet = new Set();
  static #productsDataArray = [];

  static async init({productsDataArray}) {
    this.#productsDataArray = [...productsDataArray];

    this.#productsDataArray.forEach((productData) => {
      this.#productsNameSet.add(productData.productName.toLowerCase());
    });

    const options = {keys: ['productName'], includeScore: true, threshold: 0.2};
    this.#fuse = new Fuse(this.#productsDataArray, options);
  }

  static async updateProductData({productData}) {
    if (this.#productsNameSet.has(productData.productName.toLowerCase())) {
      const currentItemIndex = this.#productsDataArray.findIndex(
        (item) =>
          item.productName.toLowerCase() ===
          productData.productName.toLowerCase(),
      );
      this.#productsDataArray.splice(currentItemIndex, 1);
    }

    const newItemIndex = this.#productsDataArray.findIndex(
      (item) => item.usageCount < productData.usageCount,
    );
    this.#productsDataArray.splice(newItemIndex, 0, productData);

    this.#fuse.setCollection(this.#productsDataArray);

    this.#productsNameSet.add(productData.productName.toLowerCase());
  }

  static async suggest({partialProductName, excludedProductNamesSet}) {
    let suggestions = [];

    const filteredProductsDataArray = this.#productsDataArray.filter(
      (productData) => !excludedProductNamesSet.has(productData.productName),
    );

    if (partialProductName) {
      suggestions = this.suggestByPartialProductName({
        partialProductName,
        productsDataArray: filteredProductsDataArray,
      });
    } else {
      suggestions = this.suggestRandomProducts({
        productsDataArray: filteredProductsDataArray,
        numberOfProductsToSuggest: 10,
      });
    }

    SystemEventsHandler.onInfo({
      info: 'SUGGESTIONS_LENGTH: ' + suggestions.length,
    });

    return suggestions;
  }

  static suggestRandomProducts({productsDataArray, numberOfProductsToSuggest}) {
    SystemEventsHandler.onInfo({info: 'suggestRandomProducts()'});

    // if (numberOfProductsToSuggest >= productsDataArray.length) {
    //   return productsDataArray;
    // }

    const incrementValue = ({currentValue, minValue, maxValue}) => {
      if (currentValue >= maxValue) {
        currentValue = minValue;
      } else {
        currentValue = currentValue + 1;
      }

      return currentValue;
    };

    const checkIsValueAlreadyUsed = ({value, alreadyUsedValuesSet}) => {
      return !!alreadyUsedValuesSet.has(value);
    };

    const incrementAndCheck = ({
      currentValue,
      alreadyUsedValuesSet,
      minValue,
      maxValue,
    }) => {
      let value = currentValue;
      let cycleBreakCounter = 0;
      while (true) {
        value = incrementValue({currentValue: value, minValue, maxValue});
        if (!checkIsValueAlreadyUsed({value, alreadyUsedValuesSet})) {
          break;
        }

        ++cycleBreakCounter;
        if (cycleBreakCounter >= maxValue) {
          value = -1;
          break;
        }
      }

      return value;
    };

    const generatedNumbersArray = [];
    const generatedNumbersSet = new Set();
    for (let i = 0; i < numberOfProductsToSuggest; ++i) {
      if (generatedNumbersSet.size >= productsDataArray.length) {
        break;
      }

      let randomNumber = Math.floor(Math.random() * productsDataArray.length);
      if (!generatedNumbersSet.has(randomNumber)) {
        generatedNumbersArray.push(randomNumber);
        generatedNumbersSet.add(randomNumber);
      } else {
        randomNumber = incrementAndCheck({
          currentValue: randomNumber,
          alreadyUsedValuesSet: generatedNumbersSet,
          minValue: 0,
          maxValue: productsDataArray.length,
        });

        if (randomNumber < 0) {
          break;
        } else {
          generatedNumbersArray.push(randomNumber);
          generatedNumbersSet.add(randomNumber);
        }
      }
    }

    SystemEventsHandler.onInfo({info: generatedNumbersArray});

    return [];
  }

  static suggestByPartialProductName({partialProductName, productsDataArray}) {
    this.#fuse.setCollection(productsDataArray);
    const searchResult = this.#fuse.search(partialProductName);

    return searchResult.slice(0, 3);
  }

  // static async suggest_old({partialProductName}) {
  //   const searchResult = this.#fuse.search(partialProductName);
  //
  //   if (!searchResult.length) {
  //     return [];
  //   }
  //
  //   const suggestions = [];
  //   if (
  //     searchResult[0].item.productName.toLowerCase() ===
  //     partialProductName.toLowerCase()
  //   ) {
  //     return suggestions;
  //   }
  //
  //   suggestions.push(searchResult[0].item);
  //   if (searchResult.length > 1) {
  //     suggestions.push(searchResult[1].item);
  //   }
  //
  //   return suggestions;
  // }
}

export default FuseProductsSuggester;
