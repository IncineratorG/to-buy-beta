package com.tobuybeta.modules.app_widget.storage.actions;

import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;
import com.tobuybeta.modules.app_widget.common.widget_list_info.WidgetListInfo;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;

import java.util.List;

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

    public static WidgetListInfo getWidgetListInfoActionResult(Object value) {
        return (WidgetListInfo) value;
    }

    public static List<WidgetRequest> getAllWidgetRequestsActionResult(Object value) {
        return (List<WidgetRequest>) value;
    }
}
