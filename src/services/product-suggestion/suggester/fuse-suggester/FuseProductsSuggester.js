import Fuse from 'fuse.js';
import {SystemEventsHandler} from '../../../service-utils/system-events-handler/SystemEventsHandler';

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

  static async suggest({partialProductName}) {
    const searchResult = this.#fuse.search(partialProductName);

    if (!searchResult.length) {
      return [];
    }

    const suggestions = [];
    if (
      searchResult[0].item.productName.toLowerCase() ===
      partialProductName.toLowerCase()
    ) {
      return suggestions;
    }

    suggestions.push(searchResult[0].item);
    if (searchResult.length > 1) {
      suggestions.push(searchResult[1].item);
    }

    return suggestions;
  }
}

export default FuseProductsSuggester;
