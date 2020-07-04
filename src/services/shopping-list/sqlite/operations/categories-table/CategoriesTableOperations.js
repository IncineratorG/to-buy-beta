import {CATEGORIES_TABLE} from '../../tables/categoriesTable';
import {SqlStatementExecutor} from '../../../../service-utils/sql-statement-executor/SqlStatementExecutor';
import categoriesTableInitialData from './initial-data/categoriesTableIntitialData';
import {CategoriesTableInitialDataParser} from './initial-data/CategoriesTableInitialDataParser';

export class CategoriesTableOperations {
  static #initialCategories;

  static async getCategories({db}) {
    const getCategoriesStatement = 'SELECT * FROM ' + CATEGORIES_TABLE;
    const result = await SqlStatementExecutor.execute({
      db,
      statement: getCategoriesStatement,
    });

    const categories = [];
    for (let i = 0; i < result.rows.length; ++i) {
      categories.push(result.rows.item(i));
    }

    if (!this.#initialCategories) {
      const initialCategoriesData = categoriesTableInitialData;
      this.#initialCategories = CategoriesTableInitialDataParser.getInitialCategories(
        {initialData: initialCategoriesData},
      );
    }

    categories.push(...this.#initialCategories);

    return categories;
  }
}
