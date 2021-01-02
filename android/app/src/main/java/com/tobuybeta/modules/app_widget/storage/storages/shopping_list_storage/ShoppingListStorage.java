package com.tobuybeta.modules.app_widget.storage.storages.shopping_list_storage;

import android.content.Context;
import android.content.SharedPreferences;

import androidx.arch.core.util.Function;

import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;
import com.tobuybeta.modules.app_widget.common.product.Product;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ShoppingListStorage {
    private static final String LIST_DATA_FIELD = "LIST_DATA";
    private static final String SHOPPING_LISTS_FIELD = "shoppingLists";

    public ShoppingListStorage() {

    }

    public boolean setShoppingList(Context context,
                                   String listId,
                                   String listName,
                                   List<Product> productsList) {
        if (context == null) {
            return false;
        } else if (listId == null || listId.equalsIgnoreCase("")) {
            return false;
        } else if (listName == null || listName.equalsIgnoreCase("")) {
            return false;
        }

        // Получаем текущий список списков покупок.
        SharedPreferences sharedPreferences = context
                .getSharedPreferences(LIST_DATA_FIELD, Context.MODE_PRIVATE);
        Set<String> existedShoppingListDescriptionsSet = sharedPreferences
                .getStringSet(SHOPPING_LISTS_FIELD, new HashSet<>());
        List<String> existedShoppingListDescriptionsList = new ArrayList<>(existedShoppingListDescriptionsSet);

        // Формируем описание полученного списка покупок.
        String currentShoppingListDescription = listId + " " + listName;

        // Если список с таким же ID уже присутствует - заменяем существующий список полученным.
        boolean shoppingListReplaced = false;
        for (int i = 0; i < existedShoppingListDescriptionsList.size(); ++i) {
            String shoppingListDescription = existedShoppingListDescriptionsList.get(i);
            String shoppingListId = shoppingListDescription.substring(0, shoppingListDescription.indexOf(" "));

            if (shoppingListId.equalsIgnoreCase(listId)) {
                existedShoppingListDescriptionsList.set(i, currentShoppingListDescription);
                shoppingListReplaced = true;
                break;
            }
        }
        // Если список не был заменён - добавляем полученный список.
        if (!shoppingListReplaced) {
            existedShoppingListDescriptionsList.add(currentShoppingListDescription);
        }
        existedShoppingListDescriptionsSet = new HashSet<>(existedShoppingListDescriptionsList);

        // Формируем список продуктов.
        Set<String> productDescriptionsSet = new HashSet<>();
        for (int i = 0; i < productsList.size(); ++i) {
            Product product = productsList.get(i);
            String productId = product.getId();
            String productName = product.getName();

            String productDescription = productId + " " + productName;
            productDescriptionsSet.add(productDescription);
        }

        // Сохраняем список продуктов и изменённый список списков покупок.
        SharedPreferences.Editor editor = sharedPreferences.edit();

        editor.putStringSet(listId, productDescriptionsSet);
        editor.putStringSet(SHOPPING_LISTS_FIELD, existedShoppingListDescriptionsSet);

        editor.commit();

        return false;
    }

    public GeneralizedList getShoppingLists(Context context) {
        if (context == null) {
            return null;
        }

        SharedPreferences sharedPreferences = context
                .getSharedPreferences(LIST_DATA_FIELD, Context.MODE_PRIVATE);
        Set<String> existedShoppingListDescriptionsSet = sharedPreferences
                .getStringSet(SHOPPING_LISTS_FIELD, new HashSet<>());

        Function<String, String> itemIdExtractor =
                (itemDescription) -> itemDescription.substring(0, itemDescription.indexOf(" "));
        Function<String, String> itemNameExtractor =
                (itemDescription) -> itemDescription.substring(itemDescription.indexOf(" ") + 1);

        return new GeneralizedList(
                "",
                new ArrayList<>(existedShoppingListDescriptionsSet),
                itemIdExtractor,
                itemNameExtractor
        );
    }

    public GeneralizedList getProductsList(Context context, String id) {
        if (context == null) {
            return null;
        }

        SharedPreferences sharedPreferences = context
                .getSharedPreferences(LIST_DATA_FIELD, Context.MODE_PRIVATE);
        Set<String> existedShoppingListDescriptionsSet = sharedPreferences
                .getStringSet(SHOPPING_LISTS_FIELD, new HashSet<>());
        Set<String> productListDescriptionSet = sharedPreferences
                .getStringSet(id, new HashSet<>());

        String title = "Unknown";
        for (String shoppingListDescription : existedShoppingListDescriptionsSet) {
            if (shoppingListDescription.startsWith(id)) {
                title = shoppingListDescription.substring(shoppingListDescription.indexOf(" ") + 1);
                break;
            }
        }

        Function<String, String> itemIdExtractor =
                (itemDescription) -> itemDescription.substring(0, itemDescription.indexOf(" "));
        Function<String, String> itemNameExtractor =
                (itemDescription) -> itemDescription.substring(itemDescription.indexOf(" ") + 1);

        return new GeneralizedList(
                title,
                new ArrayList<>(productListDescriptionSet),
                itemIdExtractor,
                itemNameExtractor
        );
    }
}
