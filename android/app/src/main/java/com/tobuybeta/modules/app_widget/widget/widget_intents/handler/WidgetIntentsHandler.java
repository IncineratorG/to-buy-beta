package com.tobuybeta.modules.app_widget.widget.widget_intents.handler;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

import com.tobuybeta.MainActivity;
import com.tobuybeta.modules.app_widget.module_constants.AppWidgetModuleConstants;
import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;
import com.tobuybeta.modules.app_widget.module_requests.requests.ChangeProductStatusRequest;
import com.tobuybeta.modules.app_widget.module_requests.requests.MarkProductAsBoughtRequest;
import com.tobuybeta.modules.app_widget.module_requests.requests.OpenShoppingListRequest;
import com.tobuybeta.modules.app_widget.storage.Storage;
import com.tobuybeta.modules.app_widget.storage.actions.StorageActions;
import com.tobuybeta.modules.app_widget.widget_models.WidgetModels;
import com.tobuybeta.modules.app_widget.widget_models.model.WidgetModel;
import com.tobuybeta.modules.app_widget.widget.Widget;
import com.tobuybeta.modules.app_widget.widget.widget_intents.fields.WidgetIntentFields;
import com.tobuybeta.modules.app_widget.widget.widget_intents.types.WidgetIntentTypes;

public class WidgetIntentsHandler {
    public static boolean handle(Context context, Intent intent) {
        String intentAction = intent.getAction();

        if (intentAction == null) {
            return false;
        } else if (!intentAction.equalsIgnoreCase(WidgetIntentFields.INTENT_ACTION)) {
            return false;
        }

        String intentType = intent.getStringExtra(WidgetIntentFields.TYPE_FIELD);
        if (intentType == null) {
            return false;
        }

        switch (intentType) {
            case (WidgetIntentTypes.ON_TITLE_PRESS): {
                int widgetId = intent.getIntExtra(WidgetIntentFields.WIDGET_ID_FIELD, -1);
                if (widgetId < 0) {
                    break;
                }

                WidgetModel model = WidgetModels.get().getOrCreate(context, widgetId);
                String listId = model.list().listId();

                OpenShoppingListRequest request = new OpenShoppingListRequest(listId);
                Storage.get().execute(StorageActions.setWidgetRequestAction(context, request));

                Intent openAppIntent = new Intent(context, MainActivity.class);
                PendingIntent openAppPendingIntent = PendingIntent.getActivity(context, 0, openAppIntent, 0);
                try {
                    openAppPendingIntent.send();
                } catch (PendingIntent.CanceledException e) {
                    Toast.makeText(context, "ON_TITLE_PRESS->ERROR", Toast.LENGTH_SHORT).show();
                }
                break;
            }

            case (WidgetIntentTypes.ON_BACK_PRESS): {
                int widgetId = intent.getIntExtra(WidgetIntentFields.WIDGET_ID_FIELD, -1);
                if (widgetId < 0) {
                    break;
                }

                WidgetModel model = WidgetModels.get().getOrCreate(context, widgetId);
                if (model == null) {
                    break;
                }
                model.loadAllShoppingLists(context);

                Widget.update(
                        context,
                        AppWidgetManager.getInstance(context).getAppWidgetIds(
                                new ComponentName(context, Widget.class)
                        )
                );
                break;
            }

            case (WidgetIntentTypes.ON_LIST_ITEM_PRESS): {
                int widgetId = intent.getIntExtra(WidgetIntentFields.WIDGET_ID_FIELD, -1);
                if (widgetId < 0) {
                    break;
                }

                String listId = intent.getStringExtra(WidgetIntentFields.LIST_ID_FIELD);

                WidgetModel model = WidgetModels.get().getOrCreate(context, widgetId);
                if (model == null) {
                    break;
                } else if (model.list().listType().equalsIgnoreCase(GeneralizedList.PRODUCTS_LIST)) {
                    break;
                }
                model.loadProductsList(context, listId);

                Widget.update(
                        context,
                        AppWidgetManager.getInstance(context).getAppWidgetIds(
                                new ComponentName(context, Widget.class)
                        )
                );
                break;
            }

            case (WidgetIntentTypes.ON_LIST_ITEM_CHECK_MARK_PRESS): {
                int widgetId = intent.getIntExtra(WidgetIntentFields.WIDGET_ID_FIELD, -1);
                if (widgetId < 0) {
                    break;
                }

                WidgetModel model = WidgetModels.get().getOrCreate(context, widgetId);
                if (model == null) {
                    break;
                }

                String listId = model.list().listId();
                String productId = intent.getStringExtra(WidgetIntentFields.PRODUCT_ID_FIELD);

//                Toast.makeText(context, "CHECK_MARK_PRESS: " + listId + " - " + productId, Toast.LENGTH_SHORT).show();

                Storage.get().execute(StorageActions.removeProductAction(context, listId, productId));

                MarkProductAsBoughtRequest request = new MarkProductAsBoughtRequest(listId, productId);
                Storage.get().execute(StorageActions.setWidgetRequestAction(context, request));

                Widget.update(
                        context,
                        AppWidgetManager.getInstance(context).getAppWidgetIds(
                                new ComponentName(context, Widget.class)
                        )
                );
                break;
            }

            case (WidgetIntentTypes.ON_SHOPPING_LIST_ITEM_PRESS): {
                int widgetId = intent.getIntExtra(WidgetIntentFields.WIDGET_ID_FIELD, -1);
                if (widgetId < 0) {
                    break;
                }

                String listId = intent.getStringExtra(WidgetIntentFields.LIST_ID_FIELD);

                WidgetModel model = WidgetModels.get().getOrCreate(context, widgetId);
                if (model == null) {
                    break;
                } else if (model.list().listType().equalsIgnoreCase(GeneralizedList.PRODUCTS_LIST)) {
                    break;
                }
                model.loadProductsList(context, listId);

                Widget.update(
                        context,
                        AppWidgetManager.getInstance(context).getAppWidgetIds(
                                new ComponentName(context, Widget.class)
                        )
                );

                break;
            }

            case (WidgetIntentTypes.ON_PRODUCT_LIST_ITEM_PRESS): {
                int widgetId = intent.getIntExtra(WidgetIntentFields.WIDGET_ID_FIELD, -1);
                if (widgetId < 0) {
                    break;
                }

                WidgetModel model = WidgetModels.get().getOrCreate(context, widgetId);
                if (model == null) {
                    break;
                }

                String listId = model.list().listId();
                String productId = intent.getStringExtra(WidgetIntentFields.PRODUCT_ID_FIELD);
                String productStatus = intent.getStringExtra(WidgetIntentFields.PRODUCT_STATUS_FIELD);

                if (listId.isEmpty()) {
                    break;
                }  else if (productId == null || productId.isEmpty()) {
                    break;
                } else if (productStatus == null || productStatus.isEmpty()) {
                    break;
                }

                String newProductStatus = null;
                if (productStatus.equalsIgnoreCase(AppWidgetModuleConstants.productStatus.NOT_COMPLETED)) {
                    newProductStatus = AppWidgetModuleConstants.productStatus.COMPLETED;
                } else {
                    newProductStatus = AppWidgetModuleConstants.productStatus.NOT_COMPLETED;
                }

                Storage.get().execute(
                        StorageActions.setProductStatus(context, listId, productId, newProductStatus)
                );

                ChangeProductStatusRequest request = new ChangeProductStatusRequest(listId, productId, newProductStatus);
                Storage.get().execute(StorageActions.setWidgetRequestAction(context, request));

                Widget.update(
                        context,
                        AppWidgetManager.getInstance(context).getAppWidgetIds(
                                new ComponentName(context, Widget.class)
                        )
                );
                break;
            }

            default: {
                return false;
            }
        }

        return true;
    }
}
