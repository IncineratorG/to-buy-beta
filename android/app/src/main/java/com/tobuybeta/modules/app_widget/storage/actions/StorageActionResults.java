package com.tobuybeta.modules.app_widget.storage.actions;

import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;

/**
 * TODO: Add a class header comment
 */

public class StorageActionResults {
    public static boolean getWidgetActiveActionResult(Object value) {
        return (boolean) value;
    }

    public static GeneralizedList getShoppingListsActionResult(Object value) {
        return (GeneralizedList) value;
    }

    public static GeneralizedList getProductsListActionResult(Object value) {
        return (GeneralizedList) value;
    }
}
