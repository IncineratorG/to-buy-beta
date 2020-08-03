import Fuse from 'fuse.js';
import {SystemEventsHandler} from '../../../service-utils/system-events-handler/SystemEventsHandler';

class FuseProductsSuggester {
  static #fuse;

  static async init({productsDataArray}) {
    const options = {keys: ['productName'], includeScore: true};
    this.#fuse = new Fuse(productsDataArray, options);
  }

  static async suggest({partialProductName}) {
    const searchResult = this.#fuse.search(partialProductName);

    if (!searchResult.length) {
      return [];
    }

    const suggestions = [];
    suggestions.push(searchResult[0].item);
    if (searchResult.length > 1) {
      suggestions.push(searchResult[1].item);
    }

    return suggestions;
  }
}

export default FuseProductsSuggester;
