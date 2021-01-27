//package com.tobuybeta.modules.app_widget.widget_models.model;
//
//import android.content.Context;
//import android.widget.Toast;
//
//import com.tobuybeta.modules.app_widget.common.action.Action;
//import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;
//import com.tobuybeta.modules.app_widget.common.widget_list_info.WidgetListInfo;
//import com.tobuybeta.modules.app_widget.storage.Storage;
//import com.tobuybeta.modules.app_widget.storage.actions.StorageActionResults;
//import com.tobuybeta.modules.app_widget.storage.actions.StorageActions;
//
//public class WidgetModel {
//    private Storage mStorage;
//    private GeneralizedList mCurrentList;
//
//    public WidgetModel(Context context, int widgetId) {
//        mStorage = Storage.get();
//
//        Action getWidgetListInfoAction = StorageActions.getWidgetListInfoAction(context, widgetId);
//        mStorage.execute(getWidgetListInfoAction);
//        WidgetListInfo widgetListInfo = StorageActionResults
//                .getWidgetListInfoActionResult(getWidgetListInfoAction.result().get());
//
//        String listType = widgetListInfo.listType();
//
//        // ===
////        Toast.makeText(context, "HERE->" + listType, Toast.LENGTH_SHORT).show();
//        // ===
//
//        if (listType.equalsIgnoreCase(GeneralizedList.UNKNOWN)
//                || listType.equalsIgnoreCase(GeneralizedList.ALL_SHOPPING_LISTS)) {
//            loadAllShoppingLists(context, widgetId);
//        } else {
//            loadProductsList(context, widgetId, widgetListInfo.listId());
//        }
//
////        Action getShoppingListsAction = StorageActions.getShoppingListsAction(context);
////        mStorage.execute(getShoppingListsAction);
////        mCurrentList = StorageActionResults
////                .getShoppingListsActionResult(getShoppingListsAction.result().get());
//    }
//
//    public void update(Context context) {
////        if (mCurrentList.listType().equalsIgnoreCase(GeneralizedList.ALL_SHOPPING_LISTS)) {
////            loadAllShoppingLists(context);
////        } else if (mCurrentList.listType().equalsIgnoreCase(GeneralizedList.PRODUCTS_LIST)) {
////            String currentListId = mCurrentList.listId();
////            loadProductsList(context, currentListId);
////        }
//    }
//
//    public boolean loadAllShoppingLists(Context context, int widgetId) {
//        Action setWidgetListInfoAction = StorageActions.setWidgetListInfoAction(
//                context, widgetId, "-1", GeneralizedList.ALL_SHOPPING_LISTS
//        );
//        Storage.get().execute(setWidgetListInfoAction);
//
//        Action getShoppingListsAction = StorageActions.getShoppingListsAction(context);
//        Storage.get().execute(getShoppingListsAction);
//        mCurrentList = StorageActionResults
//                .getShoppingListsActionResult(getShoppingListsAction.result().get());
//
//        return true;
//    }
//
//    public boolean loadProductsList(Context context, int widgetId, String listId) {
//        Action setWidgetListInfoAction = StorageActions.setWidgetListInfoAction(
//                context, widgetId, listId, GeneralizedList.ALL_SHOPPING_LISTS
//        );
//        Storage.get().execute(setWidgetListInfoAction);
//
//        Action getProductsListAction = StorageActions.getProductsListAction(context, listId);
//        Storage.get().execute(getProductsListAction);
//        mCurrentList = StorageActionResults
//                .getProductsListActionResult(getProductsListAction.result().get());
//
//        return true;
//    }
//
//    public String title() {
//        return mCurrentList.title();
//    }
//
//    public GeneralizedList list() {
//        return mCurrentList;
//    }
//
//    public GeneralizedList list_V2(Context context, int widgetId) {
//        Action getWidgetListInfoAction = StorageActions.getWidgetListInfoAction(context, widgetId);
//        Storage.get().execute(getWidgetListInfoAction);
//        WidgetListInfo widgetListInfo = StorageActionResults
//                .getWidgetListInfoActionResult(getWidgetListInfoAction.result().get());
//
//        String listId = widgetListInfo.listId();
//        String listType = widgetListInfo.listType();
//
//        Toast.makeText(context, "HERE->" + listType + " - " + listId, Toast.LENGTH_SHORT).show();
//
//        GeneralizedList list = new GeneralizedList();
//        if (listType.equalsIgnoreCase(GeneralizedList.UNKNOWN)
//                || listType.equalsIgnoreCase(GeneralizedList.ALL_SHOPPING_LISTS)) {
//
//            Action getShoppingListsAction = StorageActions.getShoppingListsAction(context);
//            Storage.get().execute(getShoppingListsAction);
//            list = StorageActionResults
//                    .getShoppingListsActionResult(getShoppingListsAction.result().get());
//        } else {
//            Action getProductsListAction = StorageActions.getProductsListAction(context, listId);
//            Storage.get().execute(getProductsListAction);
//            list = StorageActionResults
//                    .getProductsListActionResult(getProductsListAction.result().get());
//        }
//
//        return list;
//    }
//}


package com.tobuybeta.modules.app_widget.widget_models.model;

import android.content.Context;
import android.widget.Toast;

import com.tobuybeta.modules.app_widget.common.action.Action;
import com.tobuybeta.modules.app_widget.common.constants.AppWidgetModuleConstants;
import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;
import com.tobuybeta.modules.app_widget.common.widget_list_info.WidgetListInfo;
import com.tobuybeta.modules.app_widget.storage.Storage;
import com.tobuybeta.modules.app_widget.storage.actions.StorageActionResults;
import com.tobuybeta.modules.app_widget.storage.actions.StorageActions;

public class WidgetModel {
    private Storage mStorage;
    private int mWidgetId;
    private GeneralizedList mCurrentList;

    public WidgetModel(Context context, int widgetId) {
        mStorage = Storage.get();
        mWidgetId = widgetId;

        Action getWidgetListInfoAction = StorageActions.getWidgetListInfoAction(context, widgetId);
        mStorage.execute(getWidgetListInfoAction);
        WidgetListInfo widgetListInfo = StorageActionResults
                .getWidgetListInfoActionResult(getWidgetListInfoAction.result().get());

        String listType = widgetListInfo.listType();
        if (listType.equalsIgnoreCase(GeneralizedList.PRODUCTS_LIST)) {
            loadProductsList(context, widgetListInfo.listId());
        } else {
            loadAllShoppingLists(context);
        }
    }

    public void update(Context context) {
        if (mCurrentList.listType().equalsIgnoreCase(GeneralizedList.ALL_SHOPPING_LISTS)) {
            loadAllShoppingLists(context);
        } else if (mCurrentList.listType().equalsIgnoreCase(GeneralizedList.PRODUCTS_LIST)) {
            String currentListId = mCurrentList.listId();
            loadProductsList(context, currentListId);
        }
    }

    public boolean loadAllShoppingLists(Context context) {
        Action setWidgetListInfoAction = StorageActions.setWidgetListInfoAction(
                context, mWidgetId, "-1", GeneralizedList.ALL_SHOPPING_LISTS
        );
        mStorage.execute(setWidgetListInfoAction);

        Action getShoppingListsAction = StorageActions.getShoppingListsAction(context);
        mStorage.execute(getShoppingListsAction);
        mCurrentList = StorageActionResults
                .getShoppingListsActionResult(getShoppingListsAction.result().get());

        return true;
    }

    public boolean loadProductsList(Context context, String listId) {
        Action setWidgetListInfoAction = StorageActions.setWidgetListInfoAction(
                context, mWidgetId, listId, GeneralizedList.PRODUCTS_LIST
        );
        mStorage.execute(setWidgetListInfoAction);

        Action getProductsListAction = StorageActions.getProductsListAction(context, listId);
        mStorage.execute(getProductsListAction);
        mCurrentList = StorageActionResults
                .getProductsListActionResult(getProductsListAction.result().get());

        // ===
        Toast.makeText(context, "LOADED_LIST_ID->|" + mCurrentList.listId() + "|", Toast.LENGTH_SHORT).show();
        if (mCurrentList.listId().equalsIgnoreCase(AppWidgetModuleConstants.common.EMPTY_ID)) {
            return loadAllShoppingLists(context);
        }
        // ===

        return true;
    }

    public String title() {
        return mCurrentList.title();
    }

    public GeneralizedList list() {
        return mCurrentList;
    }

    public WidgetListInfo getCurrentListInfo(Context context) {
        Action action = StorageActions.getWidgetListInfoAction(context, mWidgetId);
        mStorage.execute(action);

        return StorageActionResults.getWidgetListInfoActionResult(action.result().get());
    }
}
