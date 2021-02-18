package com.tobuybeta.modules.app_widget.storage.storages.shopping_list_storage;

import android.content.Context;
import android.content.SharedPreferences;

import androidx.arch.core.util.Function;

import com.tobuybeta.modules.app_widget.common.constants.AppWidgetModuleConstants;
import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;
import com.tobuybeta.modules.app_widget.common.product.Product;
import com.tobuybeta.modules.app_widget.common.shopping_list.ShoppingList;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class ShoppingListStorage {
    private static final String LIST_DATA_FIELD = "LIST_DATA";
    private static final String SHOPPING_LISTS_FIELD = "shoppingLists";

    public ShoppingListStorage() {

    }

    public boolean initializeStorageWithShoppingLists(Context context, List<ShoppingList> shoppingLists) {
        if (context == null) {
            return false;
        }

        List<String> shoppingListsDescriptionsList = new ArrayList<>();
        Map<String, Set<String>> shoppingListProductsDescriptions = new HashMap<>();
        for (int i = 0; i < shoppingLists.size(); ++i) {
            ShoppingList shoppingList = shoppingLists.get(i);
            List<Product> productsList = shoppingList.productsList();

            Set<String> productsDescriptionsSet = new HashSet<>();
            for (int j = 0; j < productsList.size(); ++j) {
                productsDescriptionsSet.add(Product.serialize(productsList.get(j)));
            }
            shoppingListProductsDescriptions.put(shoppingList.listId(), productsDescriptionsSet);

            shoppingListsDescriptionsList.add(
                    ShoppingList.serialize(shoppingList.listId(), shoppingList.listName())
            );
        }

        SharedPreferences.Editor editor = context.getSharedPreferences(LIST_DATA_FIELD, Context.MODE_PRIVATE).edit();

        editor.clear();
        editor.putStringSet(SHOPPING_LISTS_FIELD, new HashSet<>(shoppingListsDescriptionsList));

        List<String> shoppingListsIds = new ArrayList<>(shoppingListProductsDescriptions.keySet());
        for (int i = 0; i < shoppingListsIds.size(); ++i) {
            String listId = shoppingListsIds.get(i);
            Set<String> productsDescriptionsSet = shoppingListProductsDescriptions.get(listId);

            editor.putStringSet(listId, productsDescriptionsSet);
        }

        return editor.commit();
    }

    public boolean setShoppingList(Context context,
                                   String listId,
                                   String listName,
                                   List<Product> productsList) {
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
        String currentShoppingListDescription = ShoppingList.serialize(listId, listName);

        // Если список с таким же ID уже присутствует - заменяем существующий список полученным.
        boolean shoppingListReplaced = false;
        Function<String, String> listIdExtractor = ShoppingList.serializedIdExtractor();
        for (int i = 0; i < existedShoppingListDescriptionsList.size(); ++i) {
            String shoppingListDescription = existedShoppingListDescriptionsList.get(i);
            String shoppingListId = listIdExtractor.apply(shoppingListDescription);

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
            productDescriptionsSet.add(Product.serialize(productsList.get(i)));
        }

        // Сохраняем список продуктов и изменённый список списков покупок.
        SharedPreferences.Editor editor = sharedPreferences.edit();

        editor.putStringSet(listId, productDescriptionsSet);
        editor.putStringSet(SHOPPING_LISTS_FIELD, existedShoppingListDescriptionsSet);

        return editor.commit();
    }

    public boolean setMultipleShoppingLists(Context context, List<ShoppingList> shoppingLists) {
        if (context == null) {
            return false;
        }

        for (int i = 0; i < shoppingLists.size(); ++i) {
            ShoppingList shoppingList = shoppingLists.get(i);

            setShoppingList(
                    context,
                    shoppingList.listId(),
                    shoppingList.listName(),
                    shoppingList.productsList()
            );
        }

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

        Set<String> modifiableStringifiedRequestsSet = new HashSet<>(existedShoppingListDescriptionsSet);

        List<String> existedShoppingListDescriptionsList = new ArrayList<>(modifiableStringifiedRequestsSet);
        String removedShoppingListDescription = null;
        Function<String, String> listIdExtractor = ShoppingList.serializedIdExtractor();
        for (int i = 0; i < existedShoppingListDescriptionsList.size(); ++i) {
            String shoppingListDescription = existedShoppingListDescriptionsList.get(i);
            String shoppingListId = listIdExtractor.apply(shoppingListDescription);

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

        modifiableStringifiedRequestsSet.remove(removedShoppingListDescription);

        SharedPreferences.Editor editor = sharedPreferences.edit();

        editor.putStringSet(SHOPPING_LISTS_FIELD, modifiableStringifiedRequestsSet);
        editor.remove(listId);

        return editor.commit();
    }

    public boolean removeProduct(Context context, String listId, String productId) {
        if (context == null) {
            return false;
        } else if (listId == null || listId.isEmpty()) {
            return false;
        } else if (productId == null || productId.isEmpty()) {
            return false;
        }

        SharedPreferences sharedPreferences = context
                .getSharedPreferences(LIST_DATA_FIELD, Context.MODE_PRIVATE);
        Set<String> productsListDescriptionsSet = sharedPreferences
                .getStringSet(listId, new HashSet<>());

        List<String> productsListDescriptionsList = new ArrayList<>(productsListDescriptionsSet);
        Function<String, String> productIdExtractor = Product.serializedIdExtractor();
        for (int i = 0; i < productsListDescriptionsList.size(); ++i) {
            String currentProductDescription = productsListDescriptionsList.get(i);
            String currentProductId = productIdExtractor.apply(currentProductDescription);

            if (currentProductId.equalsIgnoreCase(productId)) {
                productsListDescriptionsList.remove(i);
                break;
            }
        }

        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putStringSet(listId, new HashSet<>(productsListDescriptionsList));

        return editor.commit();
    }

    public boolean setProductStatus(Context context,
                                    String listId,
                                    String productId,
                                    String productStatus) {
        if (context == null) {
            return false;
        } else if (listId == null || listId.isEmpty()) {
            return false;
        } else if (productId == null || productId.isEmpty()) {
            return false;
        } else if (productStatus == null || productStatus.isEmpty()) {
            return false;
        } else if (!productStatus.equalsIgnoreCase(AppWidgetModuleConstants.productStatus.COMPLETED)
                && !productStatus.equalsIgnoreCase(AppWidgetModuleConstants.productStatus.NOT_COMPLETED)) {
            return false;
        }

        SharedPreferences sharedPreferences = context
                .getSharedPreferences(LIST_DATA_FIELD, Context.MODE_PRIVATE);
        Set<String> productsListDescriptionSet = sharedPreferences
                .getStringSet(listId, new HashSet<>());

        List<String> productsListDescriptionsList = new ArrayList<>(productsListDescriptionSet);
        Function<String, String> productIdExtractor = Product.serializedIdExtractor();
        for (int i = 0; i < productsListDescriptionsList.size(); ++i) {
            String currentProductDescription = productsListDescriptionsList.get(i);
            String currentProductId = productIdExtractor.apply(currentProductDescription);

            if (currentProductId.equalsIgnoreCase(productId)) {
                Product product = Product.deserialize(currentProductDescription);
                product.setStatus(productStatus);
                currentProductDescription = Product.serialize(product);
                productsListDescriptionsList.set(i, currentProductDescription);
                break;
            }
        }

        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putStringSet(listId, new HashSet<>(productsListDescriptionsList));

        return editor.commit();
    }

    public GeneralizedList getShoppingLists(Context context) {
        if (context == null) {
            return new GeneralizedList();
        }

        SharedPreferences sharedPreferences = context
                .getSharedPreferences(LIST_DATA_FIELD, Context.MODE_PRIVATE);
        Set<String> existedShoppingListDescriptionsSet = sharedPreferences
                .getStringSet(SHOPPING_LISTS_FIELD, new HashSet<>());

        return new GeneralizedList(
                "",
                "",
                new ArrayList<>(existedShoppingListDescriptionsSet),
                GeneralizedList.ALL_SHOPPING_LISTS,
                ShoppingList.serializedIdExtractor(),
                ShoppingList.serializedNameExtractor(),
                (serializedList) -> ""
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
        String listId = AppWidgetModuleConstants.common.EMPTY_ID;
        Function<String, String> listIdExtractor = ShoppingList.serializedIdExtractor();
        Function<String, String> listNameExtractor = ShoppingList.serializedNameExtractor();
        for (String shoppingListDescription : existedShoppingListDescriptionsSet) {
            String currentListId = listIdExtractor.apply(shoppingListDescription);
            if (currentListId.equalsIgnoreCase(id)) {
                title = listNameExtractor.apply(shoppingListDescription);
                listId = currentListId;
                break;
            }
        }

        return new GeneralizedList(
                listId,
                title,
                new ArrayList<>(productListDescriptionSet),
                GeneralizedList.PRODUCTS_LIST,
                Product.serializedIdExtractor(),
                Product.serializedNameExtractor(),
                Product.serializedStatusExtractor()
        );
    }
}


//package com.tobuybeta.modules.app_widget.storage.storages.shopping_list_storage;
//
//import android.content.Context;
//import android.content.SharedPreferences;
//
//import androidx.arch.core.util.Function;
//
//import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;
//import com.tobuybeta.modules.app_widget.common.product.Product;
//import com.tobuybeta.modules.app_widget.common.shopping_list.ShoppingList;
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Map;
//import java.util.Set;
//
//public class ShoppingListStorage {
//    private static final String LIST_DATA_FIELD = "LIST_DATA";
//    private static final String SHOPPING_LISTS_FIELD = "shoppingLists";
//
//    public ShoppingListStorage() {
//
//    }
//
//    public boolean initializeStorageWithShoppingLists(Context context, List<ShoppingList> shoppingLists) {
//        if (context == null) {
//            return false;
//        }
//
//        List<String> shoppingListsDescriptionsList = new ArrayList<>();
//        Map<String, Set<String>> shoppingListProductsDescriptions = new HashMap<>();
//        for (int i = 0; i < shoppingLists.size(); ++i) {
//            ShoppingList shoppingList = shoppingLists.get(i);
//            List<Product> productsList = shoppingList.productsList();
//
//            Set<String> productsDescriptionsSet = new HashSet<>();
//            for (int j = 0; j < productsList.size(); ++j) {
//                Product product = productsList.get(j);
//                String productId = product.getId();
//                String productName = product.getName();
//
//                String productDescription = productId + " " + productName;
//                productsDescriptionsSet.add(productDescription);
//            }
//            shoppingListProductsDescriptions.put(shoppingList.listId(), productsDescriptionsSet);
//
//            String currentShoppingListDescription = shoppingList.listId() + " " + shoppingList.listName();
//            shoppingListsDescriptionsList.add(currentShoppingListDescription);
//        }
//
//        SharedPreferences.Editor editor = context.getSharedPreferences(LIST_DATA_FIELD, Context.MODE_PRIVATE).edit();
//
//        editor.clear();
//        editor.putStringSet(SHOPPING_LISTS_FIELD, new HashSet<>(shoppingListsDescriptionsList));
//
//        List<String> shoppingListsIds = new ArrayList<>(shoppingListProductsDescriptions.keySet());
//        for (int i = 0; i < shoppingListsIds.size(); ++i) {
//            String listId = shoppingListsIds.get(i);
//            Set<String> productsDescriptionsSet = shoppingListProductsDescriptions.get(listId);
//
//            editor.putStringSet(listId, productsDescriptionsSet);
//        }
//
//        return editor.commit();
//    }
//
//    public boolean setShoppingList(Context context,
//                                   String listId,
//                                   String listName,
//                                   List<Product> productsList) {
//        if (context == null) {
//            return false;
//        } else if (listId == null || listId.isEmpty()) {
//            return false;
//        } else if (listName == null || listName.isEmpty()) {
//            return false;
//        }
//
//        // Получаем текущий список списков покупок.
//        SharedPreferences sharedPreferences = context
//                .getSharedPreferences(LIST_DATA_FIELD, Context.MODE_PRIVATE);
//        Set<String> existedShoppingListDescriptionsSet = sharedPreferences
//                .getStringSet(SHOPPING_LISTS_FIELD, new HashSet<>());
//        List<String> existedShoppingListDescriptionsList = new ArrayList<>(existedShoppingListDescriptionsSet);
//
//        // Формируем описание полученного списка покупок.
//        String currentShoppingListDescription = listId + " " + listName;
//
//        // Если список с таким же ID уже присутствует - заменяем существующий список полученным.
//        boolean shoppingListReplaced = false;
//        for (int i = 0; i < existedShoppingListDescriptionsList.size(); ++i) {
//            String shoppingListDescription = existedShoppingListDescriptionsList.get(i);
//            String shoppingListId = shoppingListDescription.substring(0, shoppingListDescription.indexOf(" "));
//
//            if (shoppingListId.equalsIgnoreCase(listId)) {
//                existedShoppingListDescriptionsList.set(i, currentShoppingListDescription);
//                shoppingListReplaced = true;
//                break;
//            }
//        }
//        // Если список не был заменён - добавляем полученный список.
//        if (!shoppingListReplaced) {
//            existedShoppingListDescriptionsList.add(currentShoppingListDescription);
//        }
//        existedShoppingListDescriptionsSet = new HashSet<>(existedShoppingListDescriptionsList);
//
//        // Формируем список продуктов.
//        Set<String> productDescriptionsSet = new HashSet<>();
//        for (int i = 0; i < productsList.size(); ++i) {
//            Product product = productsList.get(i);
//            String productId = product.getId();
//            String productName = product.getName();
//
//            String productDescription = productId + " " + productName;
//            productDescriptionsSet.add(productDescription);
//        }
//
//        // Сохраняем список продуктов и изменённый список списков покупок.
//        SharedPreferences.Editor editor = sharedPreferences.edit();
//
//        editor.putStringSet(listId, productDescriptionsSet);
//        editor.putStringSet(SHOPPING_LISTS_FIELD, existedShoppingListDescriptionsSet);
//
//        return editor.commit();
//    }
//
//    public boolean setMultipleShoppingLists(Context context, List<ShoppingList> shoppingLists) {
//        if (context == null) {
//            return false;
//        }
//
//        for (int i = 0; i < shoppingLists.size(); ++i) {
//            ShoppingList shoppingList = shoppingLists.get(i);
//
//            setShoppingList(
//                    context,
//                    shoppingList.listId(),
//                    shoppingList.listName(),
//                    shoppingList.productsList()
//            );
//        }
//
//        return true;
//    }
//
//    public boolean removeShoppingList(Context context, String listId) {
//        if (context == null) {
//            return false;
//        } else if (listId == null || listId.isEmpty()) {
//            return false;
//        }
//
//        SharedPreferences sharedPreferences = context
//                .getSharedPreferences(LIST_DATA_FIELD, Context.MODE_PRIVATE);
//        Set<String> existedShoppingListDescriptionsSet = sharedPreferences
//                .getStringSet(SHOPPING_LISTS_FIELD, new HashSet<>());
//
//        List<String> existedShoppingListDescriptionsList = new ArrayList<>(existedShoppingListDescriptionsSet);
//        String removedShoppingListDescription = null;
//        for (int i = 0; i < existedShoppingListDescriptionsList.size(); ++i) {
//            String shoppingListDescription = existedShoppingListDescriptionsList.get(i);
//            String shoppingListId = shoppingListDescription.substring(0, shoppingListDescription.indexOf(" "));
//
//            if (shoppingListId.equalsIgnoreCase(listId)) {
//                removedShoppingListDescription = shoppingListDescription;
//                break;
//            }
//        }
//        if (removedShoppingListDescription == null) {
//            SharedPreferences.Editor editor = sharedPreferences.edit();
//            editor.remove(listId);
//            editor.commit();
//            return false;
//        }
//
//        existedShoppingListDescriptionsSet.remove(removedShoppingListDescription);
//
//        SharedPreferences.Editor editor = sharedPreferences.edit();
//
//        editor.putStringSet(SHOPPING_LISTS_FIELD, existedShoppingListDescriptionsSet);
//        editor.remove(listId);
//
//        return editor.commit();
//    }
//
//    public boolean removeProduct(Context context, String listId, String productId) {
//        if (context == null) {
//            return false;
//        } else if (listId == null || listId.isEmpty()) {
//            return false;
//        } else if (productId == null || productId.isEmpty()) {
//            return false;
//        }
//
//        SharedPreferences sharedPreferences = context
//                .getSharedPreferences(LIST_DATA_FIELD, Context.MODE_PRIVATE);
//        Set<String> productsListDescriptionsSet = sharedPreferences
//                .getStringSet(listId, new HashSet<>());
//
//        List<String> productsListDescriptionsList = new ArrayList<>(productsListDescriptionsSet);
//        for (int i = 0; i < productsListDescriptionsList.size(); ++i) {
//            String currentProductDescription = productsListDescriptionsList.get(i);
//            String currentProductId = currentProductDescription.substring(0, currentProductDescription.indexOf(" "));
//            if (currentProductId.equalsIgnoreCase(productId)) {
//                productsListDescriptionsList.remove(i);
//                break;
//            }
//        }
//
//        SharedPreferences.Editor editor = sharedPreferences.edit();
//        editor.putStringSet(listId, new HashSet<>(productsListDescriptionsList));
//
//        return editor.commit();
//    }
//
//    public GeneralizedList getShoppingLists(Context context) {
//        if (context == null) {
//            return new GeneralizedList();
//        }
//
//        SharedPreferences sharedPreferences = context
//                .getSharedPreferences(LIST_DATA_FIELD, Context.MODE_PRIVATE);
//        Set<String> existedShoppingListDescriptionsSet = sharedPreferences
//                .getStringSet(SHOPPING_LISTS_FIELD, new HashSet<>());
//
//        Function<String, String> itemIdExtractor =
//                (itemDescription) -> itemDescription.substring(0, itemDescription.indexOf(" "));
//        Function<String, String> itemNameExtractor =
//                (itemDescription) -> itemDescription.substring(itemDescription.indexOf(" ") + 1);
//
//        return new GeneralizedList(
//                "",
//                "",
//                new ArrayList<>(existedShoppingListDescriptionsSet),
//                GeneralizedList.ALL_SHOPPING_LISTS,
//                itemIdExtractor,
//                itemNameExtractor
//        );
//    }
//
//    public GeneralizedList getProductsList(Context context, String id) {
//        if (context == null) {
//            return new GeneralizedList();
//        } else if (id == null || id.isEmpty()) {
//            return new GeneralizedList();
//        }
//
//        SharedPreferences sharedPreferences = context
//                .getSharedPreferences(LIST_DATA_FIELD, Context.MODE_PRIVATE);
//        Set<String> existedShoppingListDescriptionsSet = sharedPreferences
//                .getStringSet(SHOPPING_LISTS_FIELD, new HashSet<>());
//        Set<String> productListDescriptionSet = sharedPreferences
//                .getStringSet(id, new HashSet<>());
//
//        String title = "Unknown";
//        for (String shoppingListDescription : existedShoppingListDescriptionsSet) {
//            if (shoppingListDescription.startsWith(id)) {
//                title = shoppingListDescription.substring(shoppingListDescription.indexOf(" ") + 1);
//                break;
//            }
//        }
//
//        Function<String, String> itemIdExtractor =
//                (itemDescription) -> itemDescription.substring(0, itemDescription.indexOf(" "));
//        Function<String, String> itemNameExtractor =
//                (itemDescription) -> itemDescription.substring(itemDescription.indexOf(" ") + 1);
//
//        return new GeneralizedList(
//                id,
//                title,
//                new ArrayList<>(productListDescriptionSet),
//                GeneralizedList.PRODUCTS_LIST,
//                itemIdExtractor,
//                itemNameExtractor
//        );
//    }
//}
