package com.tobuybeta.test_widget.widget_intents.intents;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import com.tobuybeta.test_widget.MyTestWidget;
import com.tobuybeta.test_widget.widget_intents.fields.WidgetIntentFields;
import com.tobuybeta.test_widget.widget_intents.types.WidgetIntentTypes;

public class WidgetIntents {
    public static PendingIntent onTitlePressIntent(Context context, int widgetId) {
        Intent openAppIntent = new Intent(context, MyTestWidget.class);
        openAppIntent.setAction(WidgetIntentFields.INTENT_ACTION);

        openAppIntent.putExtra(WidgetIntentFields.TYPE_FIELD, WidgetIntentTypes.ON_TITLE_PRESS);
        openAppIntent.putExtra(WidgetIntentFields.WIDGET_ID_FIELD, widgetId);
        openAppIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, widgetId);

        Uri openAppIntentData = Uri.parse(openAppIntent.toUri(Intent.URI_INTENT_SCHEME));
        openAppIntent.setData(openAppIntentData);

        return PendingIntent.getBroadcast(context, widgetId, openAppIntent, 0);
    }

    public static PendingIntent onBackButtonPressIntent(Context context, int widgetId) {
        Intent backButtonIntent = new Intent(context, MyTestWidget.class);
        backButtonIntent.setAction(WidgetIntentFields.INTENT_ACTION);

        backButtonIntent.putExtra(WidgetIntentFields.TYPE_FIELD, WidgetIntentTypes.ON_BACK_PRESS);
        backButtonIntent.putExtra(WidgetIntentFields.WIDGET_ID_FIELD, widgetId);
        backButtonIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, widgetId);

        Uri backButtonIntentData = Uri.parse(backButtonIntent.toUri(Intent.URI_INTENT_SCHEME));
        backButtonIntent.setData(backButtonIntentData);

        return PendingIntent.getBroadcast(context, widgetId, backButtonIntent, 0);
    }

    public static PendingIntent onListItemPressCoveringIntent(Context context) {
        Intent coveringIntent = new Intent(context, MyTestWidget.class);

        coveringIntent.setAction(WidgetIntentFields.INTENT_ACTION);

        return PendingIntent.getBroadcast(context, 0, coveringIntent, 0);
    }

    public static Intent onListItemPressFillInIntent(int widgetId, String listId) {
        Intent listItemPressIntent = new Intent();

        listItemPressIntent.putExtra(WidgetIntentFields.TYPE_FIELD, WidgetIntentTypes.ON_LIST_ITEM_PRESS);
        listItemPressIntent.putExtra(WidgetIntentFields.WIDGET_ID_FIELD, widgetId);
        listItemPressIntent.putExtra(WidgetIntentFields.LIST_ID_FIELD, listId);
        listItemPressIntent.putExtra(WidgetIntentFields.IS_LIST_ITEM_CHECK_MARK_PRESS_FIELD, false);

        return listItemPressIntent;
    }

    public static Intent onListItemCheckMarkPressFillInIntent(int widgetId, String productId) {
        Intent listItemCheckMarkPressIntent = new Intent();

        listItemCheckMarkPressIntent.putExtra(WidgetIntentFields.TYPE_FIELD, WidgetIntentTypes.ON_LIST_ITEM_CHECK_MARK_PRESS);
        listItemCheckMarkPressIntent.putExtra(WidgetIntentFields.WIDGET_ID_FIELD, widgetId);
        listItemCheckMarkPressIntent.putExtra(WidgetIntentFields.PRODUCT_ID_FIELD, productId);
        listItemCheckMarkPressIntent.putExtra(WidgetIntentFields.IS_LIST_ITEM_CHECK_MARK_PRESS_FIELD, true);

        return listItemCheckMarkPressIntent;
    }
}
