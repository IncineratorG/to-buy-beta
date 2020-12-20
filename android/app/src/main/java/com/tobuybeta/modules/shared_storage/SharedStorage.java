package com.tobuybeta.modules.shared_storage;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tobuybeta.MyTestWidget;

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
    public void set(String message) {
        SharedPreferences.Editor editor = mContext.getSharedPreferences("DATA", Context.MODE_PRIVATE).edit();
        editor.putString("appData", message);
        editor.commit();

        //CHANGE TO THE NAME OF YOUR WIDGET
        Intent intent = new Intent(getCurrentActivity().getApplicationContext(), MyTestWidget.class);
        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
        //CHANGE TO THE NAME OF YOUR WIDGET
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
