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

  static suggestRandomProducts({
    excludedProductNamesSet,
    numberOfProductsToSuggest,
  }) {
    const filteredProductsDataArray = this.#productsDataArray.filter(
      (productData) => !excludedProductNamesSet.has(productData.productName),
    );

    const incrementIndex = ({currentValue, minValue, maxValue}) => {
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

    const incrementRandomIndex = ({
      currentValue,
      alreadyUsedValuesSet,
      minValue,
      maxValue,
    }) => {
      let value = currentValue;
      let cycleBreakCounter = 0;
      while (true) {
        value = incrementIndex({currentValue: value, minValue, maxValue});
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

    const randomIndexesArray = [];
    const randomIndexesSet = new Set();
    for (let i = 0; i < numberOfProductsToSuggest; ++i) {
      if (randomIndexesSet.size >= filteredProductsDataArray.length) {
        break;
      }

      let randomIndex = Math.floor(
        Math.random() * filteredProductsDataArray.length,
      );
      if (!randomIndexesSet.has(randomIndex)) {
        randomIndexesArray.push(randomIndex);
        randomIndexesSet.add(randomIndex);
      } else {
        randomIndex = incrementRandomIndex({
          currentValue: randomIndex,
          alreadyUsedValuesSet: randomIndexesSet,
          minValue: 0,
          maxValue: filteredProductsDataArray.length - 1,
        });

        if (randomIndex < 0) {
          break;
        } else {
          randomIndexesArray.push(randomIndex);
          randomIndexesSet.add(randomIndex);
        }
      }
    }

    const suggestedProductsDataArray = [];
    randomIndexesArray.forEach((index) => {
      suggestedProductsDataArray.push(filteredProductsDataArray[index]);
    });

    return suggestedProductsDataArray;
  }

  // static suggestByPartialProductName({partialProductName, productsDataArray}) {
  //   this.#fuse.setCollection(productsDataArray);
  //   const searchResult = this.#fuse.search(partialProductName).slice(0, 3);
  //   return searchResult.map((resultItem) => resultItem.item);
  // }

  static suggestProductByPartialProductName({
    partialProductName,
    excludedProductNamesSet,
  }) {
    const filteredProductsDataArray = this.#productsDataArray.filter(
      (productData) => !excludedProductNamesSet.has(productData.productName),
    );

    this.#fuse.setCollection(filteredProductsDataArray);
    const searchResult = this.#fuse.search(partialProductName).slice(0, 3);
    return searchResult.map((resultItem) => resultItem.item);
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
