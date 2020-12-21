package com.tobuybeta.test_widget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.widget.RemoteViews;
import android.widget.Toast;

import com.tobuybeta.R;
import com.tobuybeta.modules.shared_storage.SharedStorage;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Implementation of App Widget functionality.
 */
public class MyTestWidget extends AppWidgetProvider {
    private static final String MyOnClick1 = "myOnClickTag1";

    final String ACTION_ON_CLICK = "ru.startandroid.develop.p1211listwidget.itemonclick";
    final static String ITEM_POSITION = "item_position";

    SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        try {
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"text\":'no data'}");
            JSONObject appData = new JSONObject(appString);
            // Construct the RemoteViews object
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.my_test_widget);

//            views.setTextViewText(R.id.appwidget_text, appData.getString("text"));
//            views.setOnClickPendingIntent(R.id.test_button, getPendingSelfIntent(context, MyOnClick1));

            // Instruct the widget manager to update the widget
            appWidgetManager.updateAppWidget(appWidgetId, views);
        }catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager,
                         int[] appWidgetIds) {
        super.onUpdate(context, appWidgetManager, appWidgetIds);
        for (int i : appWidgetIds) {
            updateWidget(context, appWidgetManager, i);
        }
    }

    void updateWidget(Context context, AppWidgetManager appWidgetManager,
                      int appWidgetId) {
        RemoteViews rv = new RemoteViews(context.getPackageName(),
                R.layout.my_test_widget);

        setUpdateTV(rv, context, appWidgetId);

        setList(rv, context, appWidgetId);

        setListClick(rv, context, appWidgetId);

        appWidgetManager.updateAppWidget(appWidgetId, rv);
        appWidgetManager.notifyAppWidgetViewDataChanged(appWidgetId,
                R.id.lvList);
    }

    void setUpdateTV(RemoteViews rv, Context context, int appWidgetId) {
        rv.setTextViewText(R.id.tvUpdate,
                sdf.format(new Date(System.currentTimeMillis())));
        Intent updIntent = new Intent(context, MyTestWidget.class);
        updIntent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
        updIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS,
                new int[] { appWidgetId });
        PendingIntent updPIntent = PendingIntent.getBroadcast(context,
                appWidgetId, updIntent, 0);
        rv.setOnClickPendingIntent(R.id.tvUpdate, updPIntent);
    }

    void setList(RemoteViews rv, Context context, int appWidgetId) {
        Intent adapter = new Intent(context, MyService.class);
        adapter.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        Uri data = Uri.parse(adapter.toUri(Intent.URI_INTENT_SCHEME));
        adapter.setData(data);
        rv.setRemoteAdapter(R.id.lvList, adapter);
    }

    void setListClick(RemoteViews rv, Context context, int appWidgetId) {
        Intent listClickIntent = new Intent(context, MyTestWidget.class);
        listClickIntent.setAction(ACTION_ON_CLICK);
        PendingIntent listClickPIntent = PendingIntent.getBroadcast(context, 0,
                listClickIntent, 0);
        rv.setPendingIntentTemplate(R.id.lvList, listClickPIntent);
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if (MyOnClick1.equals(intent.getAction())){
            SharedStorage sharedStorage = SharedStorage.get(null);
            if (sharedStorage == null) {
                Toast.makeText(context, "NULL", Toast.LENGTH_SHORT).show();
                return;
            }

            sharedStorage.testSend();
        } else if (intent.getAction().equalsIgnoreCase(ACTION_ON_CLICK)) {
            int itemPos = intent.getIntExtra(ITEM_POSITION, -1);
            if (itemPos != -1) {
                Toast.makeText(context, "Clicked on item " + itemPos,
                        Toast.LENGTH_SHORT).show();
            }
        }
    };

    static protected PendingIntent getPendingSelfIntent(Context context, String action) {
        Intent intent = new Intent(context, MyTestWidget.class);
        intent.setAction(action);
        return PendingIntent.getBroadcast(context, 0, intent, 0);
    }
}



//package com.tobuybeta;
//
//import android.app.PendingIntent;
//import android.appwidget.AppWidgetManager;
//import android.appwidget.AppWidgetProvider;
//import android.content.ComponentName;
//import android.content.Context;
//import android.content.Intent;
//import android.content.SharedPreferences;
//import android.widget.RemoteViews;
//import android.widget.Toast;
//
//import com.tobuybeta.modules.shared_storage.SharedStorage;//
//import org.json.JSONException;
//import org.json.JSONObject;
//
///**
// * Implementation of App Widget functionality.
// */
//public class MyTestWidget extends AppWidgetProvider {
//    private static final String MyOnClick1 = "myOnClickTag1";
//
////    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
////
////        try {
////            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
////            String appString = sharedPref.getString("appData", "{\"text\":'no data'}");
////            JSONObject appData = new JSONObject(appString);
////            // Construct the RemoteViews object
////            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget);
////            views.setTextViewText(R.id.appwidget_text, appData.getString("text"));
////            // Instruct the widget manager to update the widget
////            appWidgetManager.updateAppWidget(appWidgetId, views);
////        }catch (JSONException e) {
////            e.printStackTrace();
////        }
////    }
//
//    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
//        try {
//            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
//            String appString = sharedPref.getString("appData", "{\"text\":'no data'}");
//            JSONObject appData = new JSONObject(appString);
//            // Construct the RemoteViews object
//            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.my_test_widget);
//
////            RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.my_test_widget);
////            remoteViews.setOnClickPendingIntent(R.id.test_button, getPendingSelfIntent(context, MyOnClick1));
//
//            views.setTextViewText(R.id.appwidget_text, appData.getString("text"));
//
//            // ===
//            views.setOnClickPendingIntent(R.id.test_button, getPendingSelfIntent(context, MyOnClick1));
//            // ===
//
//            // Instruct the widget manager to update the widget
//            appWidgetManager.updateAppWidget(appWidgetId, views);
//        }catch (JSONException e) {
//            e.printStackTrace();
//        }
//    }
////    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
////                                int appWidgetId) {
////
////        CharSequence widgetText = context.getString(R.string.appwidget_text);
////        // Construct the RemoteViews object
////        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.my_test_widget);
////        views.setTextViewText(R.id.appwidget_text, widgetText);
////
////        // Instruct the widget manager to update the widget
////        appWidgetManager.updateAppWidget(appWidgetId, views);
////    }
//
//    @Override
//    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
//        // There may be multiple widgets active, so update all of them
//        for (int appWidgetId : appWidgetIds) {
////            int widgetId = appWidgetIds[appWidgetId];
//
////            RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.my_test_widget);
//
////            remoteViews.setOnClickPendingIntent(R.id.test_button, getPendingSelfIntent(context, MyOnClick1));
////            remoteViews.setOnClickPendingIntent(R.id.widget_button_awayarm, getPendingSelfIntent(context, MyOnClick2));
////            remoteViews.setOnClickPendingIntent(R.id.widget_button_dissarm, getPendingSelfIntent(context, MyOnClick3));
//
////            remoteViews.setTextViewText(R.id.widget_textview_gpscoords, "gps cords");
//
//
//            updateAppWidget(context, appWidgetManager, appWidgetId);
//
////            ComponentName myWidget = new ComponentName(context, MyTestWidget.class);
////            appWidgetManager.updateAppWidget(myWidget, remoteViews);
//
////            appWidgetManager.updateAppWidget(widgetId, remoteViews);
//        }
//    }
//
////    @Override
////    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
////        // There may be multiple widgets active, so update all of them
////        for (int appWidgetId : appWidgetIds) {
////            updateAppWidget(context, appWidgetManager, appWidgetId);
////        }
////    }
//
//    @Override
//    public void onEnabled(Context context) {
//        // Enter relevant functionality for when the first widget is created
//    }
//
//    @Override
//    public void onDisabled(Context context) {
//        // Enter relevant functionality for when the last widget is disabled
//    }
//
//    @Override
//    public void onReceive(Context context, Intent intent) {
//        super.onReceive(context, intent);
//        if (MyOnClick1.equals(intent.getAction())){
//            SharedStorage sharedStorage = SharedStorage.get(null);
//            if (sharedStorage == null) {
//                Toast.makeText(context, "NULL", Toast.LENGTH_SHORT).show();
//                return;
//            }
//
//            sharedStorage.testSend();
//
//            //your onClick action is here
////            Toast.makeText(context, "Button1", Toast.LENGTH_SHORT).show();
//        }
//    };
//
//    static protected PendingIntent getPendingSelfIntent(Context context, String action) {
//        Intent intent = new Intent(context, MyTestWidget.class);
//        intent.setAction(action);
//        return PendingIntent.getBroadcast(context, 0, intent, 0);
//    }
//}
//
