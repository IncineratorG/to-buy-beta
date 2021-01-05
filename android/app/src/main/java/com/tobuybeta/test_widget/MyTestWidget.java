package com.tobuybeta.test_widget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.widget.RemoteViews;
import android.widget.Toast;

import com.tobuybeta.MainActivity;
import com.tobuybeta.MainApplication;
import com.tobuybeta.R;
import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;
import com.tobuybeta.modules.app_widget.storage.Storage;
import com.tobuybeta.modules.app_widget.storage.actions.StorageActions;
import com.tobuybeta.modules.app_widget.widget_models.WidgetModels;
import com.tobuybeta.modules.app_widget.widget_models.model.WidgetModel;
import com.tobuybeta.modules.shared_storage.SharedStorageModule;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.List;

/**
 * Implementation of App Widget functionality.
 */
public class MyTestWidget extends AppWidgetProvider {
    private static final String MyOnClick1 = "myOnClickTag1";

    final String ACTION_ON_CLICK = "ru.startandroid.develop.p1211listwidget.itemonclick";
    final String BUTTON_CLICK = "ru.startandroid.develop.p1211listwidget.buttonclick";
    final String RECOGNIZE_SPEECH_CLICK = "ru.startandroid.develop.p1211listwidget.recognizeSpeech";
    final static String ITEM_POSITION = "item_position";

    final static String BACK_BUTTON_CLICK = "back_button_click";

    final static String CLICKED_LIST_ID = "clicked_list_id";
    final static String WIDGET_ID = "widget_id";
    final static String ITEM_IMAGE_CLICK = "item_image_click";

    private WidgetModels mModels = WidgetModels.get();

    public MyTestWidget() {

    }

//    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
//        try {
//            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
//            String appString = sharedPref.getString("appData", "{\"text\":'no data'}");
//            JSONObject appData = new JSONObject(appString);
//            // Construct the RemoteViews object
//            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.my_test_widget);
//
//            // Instruct the widget manager to update the widget
//            appWidgetManager.updateAppWidget(appWidgetId, views);
//        }catch (JSONException e) {
//            e.printStackTrace();
//        }
//    }

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
        setButtonClick(rv, context, appWidgetId);

        appWidgetManager.updateAppWidget(appWidgetId, rv);
        appWidgetManager.notifyAppWidgetViewDataChanged(appWidgetId,
                R.id.lvList);
    }

    void setUpdateTV(RemoteViews rv, Context context, int appWidgetId) {
        WidgetModel model = mModels.getOrCreate(context, appWidgetId);

        String titleText = "ToBuy";
        int imageId = R.drawable.app_icon;
        if (model.list().listType().equalsIgnoreCase(GeneralizedList.ALL_SHOPPING_LISTS)) {
            imageId = R.drawable.app_icon;
        } else if (model.list().listType().equalsIgnoreCase(GeneralizedList.PRODUCTS_LIST)) {
            imageId = R.drawable.arrow_back;
            titleText = model.list().title();
        }

        rv.setTextViewText(R.id.titleText, titleText);
        rv.setImageViewResource(R.id.imageView, imageId);

        Intent backButtonIntent = new Intent(context, MyTestWidget.class);
        backButtonIntent.setAction(BACK_BUTTON_CLICK);
        backButtonIntent.putExtra(WIDGET_ID, appWidgetId);
        backButtonIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetId);
        Uri data = Uri.parse(backButtonIntent.toUri(Intent.URI_INTENT_SCHEME));
        backButtonIntent.setData(data);

        Intent openAppIntent = new Intent(context, MainActivity.class);

        PendingIntent backButtonPendingIntentIntent = PendingIntent
                .getBroadcast(context, appWidgetId, backButtonIntent, 0);

        PendingIntent openAppPendingIntent = PendingIntent.getActivity(context, 0, openAppIntent, 0);

        rv.setOnClickPendingIntent(R.id.imageView, backButtonPendingIntentIntent);
        rv.setOnClickPendingIntent(R.id.titleText, openAppPendingIntent);

//        rv.setTextViewText(R.id.tvUpdate,
//                sdf.format(new Date(System.currentTimeMillis())));
//        Intent updIntent = new Intent(context, MyTestWidget.class);
//        updIntent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
//        updIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS,
//                new int[] { appWidgetId });
//        PendingIntent updPIntent = PendingIntent.getBroadcast(context,
//                appWidgetId, updIntent, 0);
//        rv.setOnClickPendingIntent(R.id.tvUpdate, updPIntent);
    }
//    void setUpdateTV(RemoteViews rv, Context context, int appWidgetId) {
//        rv.setTextViewText(R.id.tvUpdate, "Back");
//
//        Intent backButtonClickIntent = new Intent(context, MyTestWidget.class);
//        backButtonClickIntent.setAction(BACK_BUTTON_CLICK);
//        backButtonClickIntent.putExtra(WIDGET_ID, appWidgetId);
//        backButtonClickIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetId);
//        Uri data = Uri.parse(backButtonClickIntent.toUri(Intent.URI_INTENT_SCHEME));
//        backButtonClickIntent.setData(data);
//
//        PendingIntent updPIntent = PendingIntent
//                .getBroadcast(context, appWidgetId, backButtonClickIntent, 0);
//
//        rv.setOnClickPendingIntent(R.id.tvUpdate, updPIntent);
//
////        rv.setTextViewText(R.id.tvUpdate,
////                sdf.format(new Date(System.currentTimeMillis())));
////        Intent updIntent = new Intent(context, MyTestWidget.class);
////        updIntent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
////        updIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS,
////                new int[] { appWidgetId });
////        PendingIntent updPIntent = PendingIntent.getBroadcast(context,
////                appWidgetId, updIntent, 0);
////        rv.setOnClickPendingIntent(R.id.tvUpdate, updPIntent);
//    }

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

    void setButtonClick(RemoteViews rv, Context context, int appWidgetId) {
        Intent activityIntent = new Intent(context, MyTestWidget.class);
        activityIntent.setAction(RECOGNIZE_SPEECH_CLICK);
        PendingIntent resultsPendingIntent = PendingIntent.getBroadcast(context, 0, activityIntent, 0);

        Intent voiceIntent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        voiceIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        voiceIntent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Speech recognition demo");
        voiceIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        voiceIntent.putExtra(RecognizerIntent.EXTRA_RESULTS_PENDINGINTENT, resultsPendingIntent);

        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, voiceIntent, 0);
    }

    @Override
    public void onEnabled(Context context) {
        Storage.get().execute(
                StorageActions.setWidgetActiveAction(context, true)
        );
    }

    @Override
    public void onDisabled(Context context) {
        Storage.get().execute(
                StorageActions.setWidgetActiveAction(context, false)
        );
//        mModels.clear();
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if (MyOnClick1.equals(intent.getAction())){
            SharedStorageModule sharedStorage = SharedStorageModule.get(null);
            if (sharedStorage == null) {
                Toast.makeText(context, "NULL", Toast.LENGTH_SHORT).show();
                return;
            }

            sharedStorage.testSend();
        } else if (intent.getAction().equalsIgnoreCase(ACTION_ON_CLICK)) {

//            int itemPos = intent.getIntExtra(ITEM_POSITION, -1);
//            Toast.makeText(context, "ON_CLICK", Toast.LENGTH_SHORT).show();

            String clickedListId = intent.getStringExtra(CLICKED_LIST_ID);
            int widgetId = intent.getIntExtra(WIDGET_ID, -1);

            // ===
            String itemImageClick = intent.getStringExtra(ITEM_IMAGE_CLICK);
            Toast.makeText(context, "ITEM_IMAGE_CLICK->" + itemImageClick, Toast.LENGTH_SHORT).show();
            // ===

            WidgetModel model = mModels.getOrCreate(context, widgetId);
            if (model.list().listType().equalsIgnoreCase(GeneralizedList.PRODUCTS_LIST)) {
                Toast.makeText(context, "PRODUCTS_LIST->DO_NOTHING", Toast.LENGTH_SHORT).show();
                return;
            }

            model.loadProductsList(context, clickedListId);

//            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
//            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(new ComponentName(context, MyTestWidget.class));
//            appWidgetManager.notifyAppWidgetViewDataChanged(appWidgetIds, R.id.lvList);

            // ===
            Intent updateListIntent = new Intent(context, MyTestWidget.class);
            updateListIntent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
            int[] ids = AppWidgetManager.getInstance(context).
                    getAppWidgetIds(new ComponentName(context, MyTestWidget.class));
            updateListIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
            context.sendBroadcast(updateListIntent);
            // ===

//            String listName = "Unknown";
//            if (model != null) {
//                listName = model.list().name(itemPos);
//            }
//
//            Toast.makeText(
//                    context,
//                    "LIST_ID " + clickedListId + " - " + String.valueOf(widgetId) + " - " + listName,
//                    Toast.LENGTH_SHORT
//            ).show();

        }  else if (intent.getAction().equalsIgnoreCase(BACK_BUTTON_CLICK)) {
//            Toast.makeText(context, String.valueOf(val), Toast.LENGTH_SHORT).show();
//            val = val + 1;
//
//            Intent updateIntent = new Intent(context, MyTestWidget.class);
//            updateIntent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
//            int[] ids = AppWidgetManager.getInstance(context).
//                    getAppWidgetIds(new ComponentName(context, MyTestWidget.class));
//            updateIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
//            context.sendBroadcast(updateIntent);

            int widgetId = intent.getIntExtra(WIDGET_ID, -1);

//            WidgetModel model = mModels.getOrNull(widgetId);
            WidgetModel model = mModels.getOrCreate(context, widgetId);
            if (model == null) {
                Toast.makeText(context, "MODEL_IS_NULL->DO_NOTHING: " + String.valueOf(widgetId), Toast.LENGTH_SHORT).show();
                return;
            }
            if (model.list().listType().equalsIgnoreCase(GeneralizedList.ALL_SHOPPING_LISTS)) {
                Toast.makeText(context, "ALL_SHOPPING_LISTS->DO_NOTHING", Toast.LENGTH_SHORT).show();
                return;
            }

            model.loadAllShoppingLists(context);

            Intent updateListIntent = new Intent(context, MyTestWidget.class);
            updateListIntent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
            int[] ids = AppWidgetManager.getInstance(context).
                    getAppWidgetIds(new ComponentName(context, MyTestWidget.class));
            updateListIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
            context.sendBroadcast(updateListIntent);
        } else if (intent.getAction().equalsIgnoreCase(BUTTON_CLICK)) {
            Toast.makeText(context, "IN_BUTTON_CLICK", Toast.LENGTH_SHORT).show();

//            intent.getExtras().getStringArrayList(RecognizerIntent.EXTRA_RESULTS);
            Bundle extras = intent.getExtras();
            if (extras == null) {
                Toast.makeText(context, "EXTRAS_IS_NULL", Toast.LENGTH_SHORT).show();
                return;
            }

            List<String> resultsList = extras.getStringArrayList(RecognizerIntent.EXTRA_RESULTS);
            if (resultsList == null) {
                Toast.makeText(context, "RESULTS_LIST_IS_NULL", Toast.LENGTH_SHORT).show();
                return;
            }

            StringBuilder resultsString = new StringBuilder();
            for (String result : resultsList) {
                resultsString.append("\n ").append(result);
            }

            Toast.makeText(context, "RESULT: " + resultsString.toString(), Toast.LENGTH_SHORT).show();
        } else if (intent.getAction().equalsIgnoreCase(RECOGNIZE_SPEECH_CLICK)) {
            Toast.makeText(context, "IN_RECOGNIZE_SPEECH_CLICK", Toast.LENGTH_SHORT).show();

            SharedStorageModule sharedStorage = SharedStorageModule.get(null);
            if (sharedStorage == null) {
                return;
            }
            sharedStorage.testSend();

            Bundle extras = intent.getExtras();
            if (extras == null) {
                Toast.makeText(context, "EXTRAS_IS_NULL", Toast.LENGTH_SHORT).show();
                return;
            }

            List<String> resultsList = extras.getStringArrayList(RecognizerIntent.EXTRA_RESULTS);
            if (resultsList == null) {
                Toast.makeText(context, "RESULTS_LIST_IS_NULL", Toast.LENGTH_SHORT).show();
                return;
            }

            StringBuilder resultsString = new StringBuilder();
            for (String result : resultsList) {
                resultsString.append("\n ").append(result);
            }

            Toast.makeText(context, "RESULT: " + resultsString.toString(), Toast.LENGTH_SHORT).show();
        }
    };
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


//package com.tobuybeta.test_widget;
//
//import android.app.PendingIntent;
//import android.appwidget.AppWidgetManager;
//import android.appwidget.AppWidgetProvider;
//import android.content.Context;
//import android.content.Intent;
//import android.content.SharedPreferences;
//import android.net.Uri;
//import android.os.Bundle;
//import android.speech.RecognizerIntent;
//import android.widget.RemoteViews;
//import android.widget.Toast;
//
//import com.tobuybeta.R;
//import com.tobuybeta.modules.app_widget.storage.Storage;
//import com.tobuybeta.modules.app_widget.storage.actions.StorageActions;
//import com.tobuybeta.modules.app_widget.widget_models.WidgetModels;
//import com.tobuybeta.modules.app_widget.widget_models.model.WidgetModel;
//import com.tobuybeta.modules.shared_storage.SharedStorageModule;
//
//import org.json.JSONException;
//import org.json.JSONObject;
//
//import java.text.SimpleDateFormat;
//import java.util.Date;
//import java.util.List;
//
///**
// * Implementation of App Widget functionality.
// */
//public class MyTestWidget extends AppWidgetProvider {
//    private static final String MyOnClick1 = "myOnClickTag1";
//
//    final String ACTION_ON_CLICK = "ru.startandroid.develop.p1211listwidget.itemonclick";
//    final String BUTTON_CLICK = "ru.startandroid.develop.p1211listwidget.buttonclick";
//    final String RECOGNIZE_SPEECH_CLICK = "ru.startandroid.develop.p1211listwidget.recognizeSpeech";
//    final static String ITEM_POSITION = "item_position";
//
//    SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
//
//    private WidgetModels mModels;
//
//    public MyTestWidget() {
//        mModels = WidgetModels.get();
//    }
//
//    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
//        try {
//            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
//            String appString = sharedPref.getString("appData", "{\"text\":'no data'}");
//            JSONObject appData = new JSONObject(appString);
//            // Construct the RemoteViews object
//            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.my_test_widget);
//
////            views.setTextViewText(R.id.appwidget_text, appData.getString("text"));
////            views.setOnClickPendingIntent(R.id.test_button, getPendingSelfIntent(context, MyOnClick1));
//
//            // Instruct the widget manager to update the widget
//            appWidgetManager.updateAppWidget(appWidgetId, views);
//        }catch (JSONException e) {
//            e.printStackTrace();
//        }
//    }
//
//    @Override
//    public void onUpdate(Context context, AppWidgetManager appWidgetManager,
//                         int[] appWidgetIds) {
//        super.onUpdate(context, appWidgetManager, appWidgetIds);
//        for (int i : appWidgetIds) {
//            updateWidget(context, appWidgetManager, i);
//        }
//    }
//
//    void updateWidget(Context context, AppWidgetManager appWidgetManager,
//                      int appWidgetId) {
//        RemoteViews rv = new RemoteViews(context.getPackageName(),
//                R.layout.my_test_widget);
//
//        setUpdateTV(rv, context, appWidgetId);
//        setList(rv, context, appWidgetId);
//        setListClick(rv, context, appWidgetId);
//        setButtonClick(rv, context, appWidgetId);
//
//        // =====
////        SharedPreferences sharedPreferences = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
////        Set<String> productsSet = sharedPreferences.getStringSet("products", new HashSet<>());
////
////        List<String> productsList = new ArrayList<>(productsSet);
////
////        String productsString = "";
////        for (int i = 0; i < productsList.size(); ++i) {
////            String productString = productsList.get(i);
////
////            String productId = productString.substring(0, productString.indexOf(" "));
////            String productName = productString.substring(productString.indexOf(" " ) + 1);
////
////            productsString = productsString + productId + " - " + productName + "\n";
////        }
//        // =====
//
//        appWidgetManager.updateAppWidget(appWidgetId, rv);
//        appWidgetManager.notifyAppWidgetViewDataChanged(appWidgetId,
//                R.id.lvList);
//
////        Toast.makeText(context, "updateWidget(): " + productsString, Toast.LENGTH_SHORT).show();
//    }
//
//    void setUpdateTV(RemoteViews rv, Context context, int appWidgetId) {
//        // ===
////        WidgetModel model = WidgetModels.get().getOrCreate(context, appWidgetId);
////        Toast.makeText(context, model.title(), Toast.LENGTH_LONG).show();
//        // ===
//
//        rv.setTextViewText(R.id.tvUpdate,
//                sdf.format(new Date(System.currentTimeMillis())));
//        Intent updIntent = new Intent(context, MyTestWidget.class);
//        updIntent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
//        updIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS,
//                new int[] { appWidgetId });
//        PendingIntent updPIntent = PendingIntent.getBroadcast(context,
//                appWidgetId, updIntent, 0);
//        rv.setOnClickPendingIntent(R.id.tvUpdate, updPIntent);
//    }
//
//    void setList(RemoteViews rv, Context context, int appWidgetId) {
//        Intent adapter = new Intent(context, MyService.class);
//        adapter.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
//        Uri data = Uri.parse(adapter.toUri(Intent.URI_INTENT_SCHEME));
//        adapter.setData(data);
//        rv.setRemoteAdapter(R.id.lvList, adapter);
//    }
//
//    void setListClick(RemoteViews rv, Context context, int appWidgetId) {
//        Intent listClickIntent = new Intent(context, MyTestWidget.class);
//        listClickIntent.setAction(ACTION_ON_CLICK);
//        PendingIntent listClickPIntent = PendingIntent.getBroadcast(context, 0,
//                listClickIntent, 0);
//        rv.setPendingIntentTemplate(R.id.lvList, listClickPIntent);
//    }
//
//    void setButtonClick(RemoteViews rv, Context context, int appWidgetId) {
////        Intent activityIntent = new Intent(context, MyTestWidget.class);
////        activityIntent.setAction(RECOGNIZE_SPEECH_CLICK);
////        PendingIntent resultsPendingIntent = PendingIntent.getBroadcast(context, 0, activityIntent, 0);
////
////        rv.setOnClickPendingIntent(R.id.button, resultsPendingIntent);
//
//        // =====
//        // =======
//        Intent activityIntent = new Intent(context, MyTestWidget.class);
//        activityIntent.setAction(RECOGNIZE_SPEECH_CLICK);
//        PendingIntent resultsPendingIntent = PendingIntent.getBroadcast(context, 0, activityIntent, 0);
//
//        Intent voiceIntent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
//        voiceIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
//        voiceIntent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Speech recognition demo");
//        voiceIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//        voiceIntent.putExtra(RecognizerIntent.EXTRA_RESULTS_PENDINGINTENT, resultsPendingIntent);
//
//        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, voiceIntent, 0);
////        rv.setOnClickPendingIntent(R.id.button, pendingIntent);
//        // =======
//        // =====
//
//
//
//
////        Intent buttonClickListener = new Intent(context, MyTestWidget.class);
////        buttonClickListener.setAction(BUTTON_CLICK);
////
////        PendingIntent buttonClickPendingIntent = PendingIntent.
////                getBroadcast(context, 0, buttonClickListener, 0);
////
////        rv.setOnClickPendingIntent(R.id.button, buttonClickPendingIntent);
//
//
//
//
//
//        // ===
//        // this intent points to activity that should handle results
////        Intent activityIntent = new Intent(context, ResultsActivity.class);
////// this intent wraps results activity intent
////        PendingIntent resultsPendingIntent = PendingIntent.getActivity(context, 0, activityIntent, 0);
////
////// this intent calls the speech recognition
////        Intent voiceIntent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
////        voiceIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
////        voiceIntent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Speech recognition demo");
////        voiceIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
////        voiceIntent.putExtra(RecognizerIntent.EXTRA_RESULTS_PENDINGINTENT, resultsPendingIntent);
////
////// this intent wraps voice recognition intent
////        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, voiceIntent, 0);
////        rv.setOnClickPendingIntent(R.id.btn, pendingIntent);
//        // ===
//    }
//
//    @Override
//    public void onEnabled(Context context) {
//        // Enter relevant functionality for when the first widget is created
//
//        Storage.get().execute(
//                StorageActions.setWidgetActiveAction(context, true)
//        );
//
////        Storage.get().setWidgetActive(context, true);
//    }
//
//    @Override
//    public void onDisabled(Context context) {
//        // Enter relevant functionality for when the last widget is disabled
//
//        Storage.get().execute(
//                StorageActions.setWidgetActiveAction(context, false)
//        );
//
//        mModels.clear();
//
////        Storage.get().clear(context);
////        Storage.get().setWidgetActive(context, false);
//    }
//
//    @Override
//    public void onReceive(Context context, Intent intent) {
//        super.onReceive(context, intent);
//        if (MyOnClick1.equals(intent.getAction())){
//            SharedStorageModule sharedStorage = SharedStorageModule.get(null);
//            if (sharedStorage == null) {
//                Toast.makeText(context, "NULL", Toast.LENGTH_SHORT).show();
//                return;
//            }
//
//            sharedStorage.testSend();
//        } else if (intent.getAction().equalsIgnoreCase(ACTION_ON_CLICK)) {
//            int itemPos = intent.getIntExtra(ITEM_POSITION, -1);
////            if (itemPos != -1) {
////                Toast.makeText(context, "Clicked on item " + itemPos,
////                        Toast.LENGTH_SHORT).show();
////            }
//
//            // ===
//            SharedStorageModule sharedStorage = SharedStorageModule.get(null);
//            if (sharedStorage == null) {
//                Toast.makeText(context, "NULL", Toast.LENGTH_SHORT).show();
//                return;
//            }
//
//            Toast.makeText(context, "Clicked on item " + itemPos,
//                    Toast.LENGTH_SHORT).show();
//
////            Intent configIntent = new Intent(context, MainActivity.class);
////            PendingIntent configPendingIntent = PendingIntent.getActivity(context, 0, configIntent, 0);
//
//            sharedStorage.testSend();
//            // ===
//        } else if (intent.getAction().equalsIgnoreCase(BUTTON_CLICK)) {
//            Toast.makeText(context, "IN_BUTTON_CLICK", Toast.LENGTH_SHORT).show();
//
////            intent.getExtras().getStringArrayList(RecognizerIntent.EXTRA_RESULTS);
//            Bundle extras = intent.getExtras();
//            if (extras == null) {
//                Toast.makeText(context, "EXTRAS_IS_NULL", Toast.LENGTH_SHORT).show();
//                return;
//            }
//
//            List<String> resultsList = extras.getStringArrayList(RecognizerIntent.EXTRA_RESULTS);
//            if (resultsList == null) {
//                Toast.makeText(context, "RESULTS_LIST_IS_NULL", Toast.LENGTH_SHORT).show();
//                return;
//            }
//
//            StringBuilder resultsString = new StringBuilder();
//            for (String result : resultsList) {
//                resultsString.append("\n ").append(result);
//            }
//
//            Toast.makeText(context, "RESULT: " + resultsString.toString(), Toast.LENGTH_SHORT).show();
//        } else if (intent.getAction().equalsIgnoreCase(RECOGNIZE_SPEECH_CLICK)) {
//            Toast.makeText(context, "IN_RECOGNIZE_SPEECH_CLICK", Toast.LENGTH_SHORT).show();
//
//            SharedStorageModule sharedStorage = SharedStorageModule.get(null);
//            if (sharedStorage == null) {
//                return;
//            }
//            sharedStorage.testSend();
//
//            Bundle extras = intent.getExtras();
//            if (extras == null) {
//                Toast.makeText(context, "EXTRAS_IS_NULL", Toast.LENGTH_SHORT).show();
//                return;
//            }
//
//            List<String> resultsList = extras.getStringArrayList(RecognizerIntent.EXTRA_RESULTS);
//            if (resultsList == null) {
//                Toast.makeText(context, "RESULTS_LIST_IS_NULL", Toast.LENGTH_SHORT).show();
//                return;
//            }
//
//            StringBuilder resultsString = new StringBuilder();
//            for (String result : resultsList) {
//                resultsString.append("\n ").append(result);
//            }
//
//            Toast.makeText(context, "RESULT: " + resultsString.toString(), Toast.LENGTH_SHORT).show();
//        }
//    };
//}
//
//
//
////package com.tobuybeta;
////
////import android.app.PendingIntent;
////import android.appwidget.AppWidgetManager;
////import android.appwidget.AppWidgetProvider;
////import android.content.ComponentName;
////import android.content.Context;
////import android.content.Intent;
////import android.content.SharedPreferences;
////import android.widget.RemoteViews;
////import android.widget.Toast;
////
////import com.tobuybeta.modules.shared_storage.SharedStorage;//
////import org.json.JSONException;
////import org.json.JSONObject;
////
/////**
//// * Implementation of App Widget functionality.
//// */
////public class MyTestWidget extends AppWidgetProvider {
////    private static final String MyOnClick1 = "myOnClickTag1";
////
//////    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
//////
//////        try {
//////            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
//////            String appString = sharedPref.getString("appData", "{\"text\":'no data'}");
//////            JSONObject appData = new JSONObject(appString);
//////            // Construct the RemoteViews object
//////            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget);
//////            views.setTextViewText(R.id.appwidget_text, appData.getString("text"));
//////            // Instruct the widget manager to update the widget
//////            appWidgetManager.updateAppWidget(appWidgetId, views);
//////        }catch (JSONException e) {
//////            e.printStackTrace();
//////        }
//////    }
////
////    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
////        try {
////            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
////            String appString = sharedPref.getString("appData", "{\"text\":'no data'}");
////            JSONObject appData = new JSONObject(appString);
////            // Construct the RemoteViews object
////            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.my_test_widget);
////
//////            RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.my_test_widget);
//////            remoteViews.setOnClickPendingIntent(R.id.test_button, getPendingSelfIntent(context, MyOnClick1));
////
////            views.setTextViewText(R.id.appwidget_text, appData.getString("text"));
////
////            // ===
////            views.setOnClickPendingIntent(R.id.test_button, getPendingSelfIntent(context, MyOnClick1));
////            // ===
////
////            // Instruct the widget manager to update the widget
////            appWidgetManager.updateAppWidget(appWidgetId, views);
////        }catch (JSONException e) {
////            e.printStackTrace();
////        }
////    }
//////    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
//////                                int appWidgetId) {
//////
//////        CharSequence widgetText = context.getString(R.string.appwidget_text);
//////        // Construct the RemoteViews object
//////        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.my_test_widget);
//////        views.setTextViewText(R.id.appwidget_text, widgetText);
//////
//////        // Instruct the widget manager to update the widget
//////        appWidgetManager.updateAppWidget(appWidgetId, views);
//////    }
////
////    @Override
////    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
////        // There may be multiple widgets active, so update all of them
////        for (int appWidgetId : appWidgetIds) {
//////            int widgetId = appWidgetIds[appWidgetId];
////
//////            RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.my_test_widget);
////
//////            remoteViews.setOnClickPendingIntent(R.id.test_button, getPendingSelfIntent(context, MyOnClick1));
//////            remoteViews.setOnClickPendingIntent(R.id.widget_button_awayarm, getPendingSelfIntent(context, MyOnClick2));
//////            remoteViews.setOnClickPendingIntent(R.id.widget_button_dissarm, getPendingSelfIntent(context, MyOnClick3));
////
//////            remoteViews.setTextViewText(R.id.widget_textview_gpscoords, "gps cords");
////
////
////            updateAppWidget(context, appWidgetManager, appWidgetId);
////
//////            ComponentName myWidget = new ComponentName(context, MyTestWidget.class);
//////            appWidgetManager.updateAppWidget(myWidget, remoteViews);
////
//////            appWidgetManager.updateAppWidget(widgetId, remoteViews);
////        }
////    }
////
//////    @Override
//////    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
//////        // There may be multiple widgets active, so update all of them
//////        for (int appWidgetId : appWidgetIds) {
//////            updateAppWidget(context, appWidgetManager, appWidgetId);
//////        }
//////    }
////
////    @Override
////    public void onEnabled(Context context) {
////        // Enter relevant functionality for when the first widget is created
////    }
////
////    @Override
////    public void onDisabled(Context context) {
////        // Enter relevant functionality for when the last widget is disabled
////    }
////
////    @Override
////    public void onReceive(Context context, Intent intent) {
////        super.onReceive(context, intent);
////        if (MyOnClick1.equals(intent.getAction())){
////            SharedStorage sharedStorage = SharedStorage.get(null);
////            if (sharedStorage == null) {
////                Toast.makeText(context, "NULL", Toast.LENGTH_SHORT).show();
////                return;
////            }
////
////            sharedStorage.testSend();
////
////            //your onClick action is here
//////            Toast.makeText(context, "Button1", Toast.LENGTH_SHORT).show();
////        }
////    };
////
////    static protected PendingIntent getPendingSelfIntent(Context context, String action) {
////        Intent intent = new Intent(context, MyTestWidget.class);
////        intent.setAction(action);
////        return PendingIntent.getBroadcast(context, 0, intent, 0);
////    }
////}
////
