package com.tobuybeta.modules.app_widget.storage.storages.shopping_list_storage;

import android.content.Context;
import android.content.SharedPreferences;

import androidx.arch.core.util.Function;

import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;
import com.tobuybeta.modules.app_widget.common.product.Product;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
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
//        Collections.sort(productsList, new Comparator<Product>() {
//            @Override
//            public int compare(Product product1, Product product2) {
//                return product2.getIntId() - product1.getIntId();
//            }
//        });

        // ===
//        int[] data = new int[] { 5, 4, 2, 1, 3 };
//        Arrays.sort(data, new Comparator<Integer>() {
//            public int compare(Integer o1, Integer o2) {
//                // Intentional: Reverse order for this demo
//                return o2.compareTo(o1);
//            }
//        });
        // ===

        if (context == null) {
            return false;
        } else if (listId == null || listId.isEmpty()) {
            return false;
        } else if (listName == null || listName.isEmpty()) {
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

        return true;
    }

    public boolean removeShoppingList(Context context, String listId) {
        if (context == null) {
            return false;
        } else if (listId == null || listId.isEmpty()) {
            return false;
        }

        SharedPreferences sharedPreferences = context
                .getSharedPreferences(LIST_DATA_FIELD, Context.MODE_PRIVATE);
        Set<String> existedShoppingListDescriptionsSet = sharedPreferences
                .getStringSet(SHOPPING_LISTS_FIELD, new HashSet<>());
//        Set<String> productListDescriptionSet = sharedPreferences
//                .getStringSet(listId, new HashSet<>());

        List<String> existedShoppingListDescriptionsList = new ArrayList<>(existedShoppingListDescriptionsSet);
        String removedShoppingListDescription = null;
        for (int i = 0; i < existedShoppingListDescriptionsList.size(); ++i) {
            String shoppingListDescription = existedShoppingListDescriptionsList.get(i);
            String shoppingListId = shoppingListDescription.substring(0, shoppingListDescription.indexOf(" "));

            if (shoppingListId.equalsIgnoreCase(listId)) {
                removedShoppingListDescription = shoppingListDescription;
                break;
            }
        }
        if (removedShoppingListDescription == null) {
            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.remove(listId);
            editor.commit();
            return false;
        }

        existedShoppingListDescriptionsSet.remove(removedShoppingListDescription);

        SharedPreferences.Editor editor = sharedPreferences.edit();

        editor.putStringSet(SHOPPING_LISTS_FIELD, existedShoppingListDescriptionsSet);
        editor.remove(listId);

        editor.commit();

        return true;
    }

    public GeneralizedList getShoppingLists(Context context) {
        if (context == null) {
            return new GeneralizedList();
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
                "",
                new ArrayList<>(existedShoppingListDescriptionsSet),
                GeneralizedList.ALL_SHOPPING_LISTS,
                itemIdExtractor,
                itemNameExtractor
        );
    }

    public GeneralizedList getProductsList(Context context, String id) {
        if (context == null) {
            return new GeneralizedList();
        } else if (id == null || id.isEmpty()) {
            return new GeneralizedList();
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
                id,
                title,
                new ArrayList<>(productListDescriptionSet),
                GeneralizedList.PRODUCTS_LIST,
                itemIdExtractor,
                itemNameExtractor
        );
    }
}
