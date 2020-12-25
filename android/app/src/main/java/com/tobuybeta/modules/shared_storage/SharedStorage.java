package com.tobuybeta.modules.shared_storage;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableNativeArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tobuybeta.test_widget.MyTestWidget;

import java.util.HashSet;
import java.util.Set;

/**
 * TODO: Add a class header comment
 */

public class SharedStorage extends ReactContextBaseJavaModule {
    private static SharedStorage mInstance;
    private ReactApplicationContext mContext;

    private SharedStorage(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    public static SharedStorage get(ReactApplicationContext reactContext) {
        if (reactContext == null) {
            if (mInstance == null) {
                return null;
            } else {
                return mInstance;
            }
        }

        if (mInstance == null) {
            mInstance = new SharedStorage(reactContext);
        }

        return mInstance;
    }

    @NonNull
    @Override
    public String getName() {
        return "SharedStorage";
    }

    @ReactMethod
    public void setShoppingList(String listId, String listName, ReadableArray productsList) {
        String productsString = "";
        for (int i = 0; i < productsList.size(); ++i) {
            ReadableMap product = productsList.getMap(i);
            if (product != null) {
                String productId = String.valueOf(product.getInt("id"));
                String productName = product.getString("name");

                productsString = productsString + "; " + productId + " " + productName;
            }
        }

//        Toast.makeText(mContext, listId + " - " + listName + " - " + productsString, Toast.LENGTH_SHORT).show();

        // ===
        SharedPreferences.Editor editor = mContext.getSharedPreferences("DATA", Context.MODE_PRIVATE).edit();

        Set<String> productsSet = new HashSet<>();
        for (int i = 0; i < productsList.size(); ++i) {
            ReadableMap product = productsList.getMap(i);
            if (product != null) {
                String productId = String.valueOf(product.getInt("id"));
                String productName = product.getString("name");

                productsSet.add(productId + " " + productName);
            }
        }

        editor.putStringSet("products", productsSet);

        editor.commit();

        Intent intent = new Intent(getCurrentActivity().getApplicationContext(), MyTestWidget.class);
        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
        int[] ids = AppWidgetManager.getInstance(
                getCurrentActivity().getApplicationContext()).
                getAppWidgetIds(
                        new ComponentName(
                                getCurrentActivity().getApplicationContext(),
                                MyTestWidget.class
                        )
                );
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
        getCurrentActivity().getApplicationContext().sendBroadcast(intent);
        // ===
    }

    @ReactMethod
    public void set(String message) {
        SharedPreferences.Editor editor = mContext.getSharedPreferences("DATA", Context.MODE_PRIVATE).edit();
        editor.putString("appData", message);
        editor.commit();

        Intent intent = new Intent(getCurrentActivity().getApplicationContext(), MyTestWidget.class);
        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);

        int[] ids = AppWidgetManager.getInstance(
                getCurrentActivity().getApplicationContext()).
                getAppWidgetIds(
                        new ComponentName(
                                getCurrentActivity().getApplicationContext(),
                                MyTestWidget.class
                        )
        );
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
        getCurrentActivity().getApplicationContext().sendBroadcast(intent);

    }

    public void testSend() {
        WritableMap params = new WritableNativeMap();
        params.putString("eventProperty", "someValue");

        sendEvent(mContext, "EventReminder", params);
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
