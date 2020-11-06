package com.tobuybeta.modules.phonemessaging;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.HashMap;
import java.util.Map;

/**
 * TODO: Add a class header comment
 */
public class PhoneMessagingModule extends ReactContextBaseJavaModule {
    private static final String RESULT_FIELD = "RESULT";
    private static final String ERROR_FIELD = "ERROR";

    private static final String SMS = "sms";
    private static final String WHATS_APP = "whatsApp";

    private static final String WHATS_APP_URI = "com.whatsapp";

    public PhoneMessagingModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "PhoneMessaging";
    }

    @ReactMethod
    public void checkServicesAvailability(Promise promise) {
        Map<String, Boolean> hasWhatsAppData = hasApp(WHATS_APP_URI);

        boolean smsAvailable = true;
        boolean whatsAppAvailable = false;
        if (hasWhatsAppData.containsKey(RESULT_FIELD)) {
            whatsAppAvailable = hasWhatsAppData.get(RESULT_FIELD);
        }

        WritableMap resultMap = new WritableNativeMap();
        resultMap.putBoolean(SMS, smsAvailable);
        resultMap.putBoolean(WHATS_APP, whatsAppAvailable);

        promise.resolve(resultMap);
    }

    @ReactMethod
    public void sendSmsMessage(String text, Promise result) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            result.reject("ERROR", "UNABLE_TO_ACQUIRE_CURRENT_ACTIVITY");
            return;
        }

        PackageManager packageManager = currentActivity.getPackageManager();

        Intent intent = new Intent(Intent.ACTION_SENDTO);
        intent.setData(Uri.parse("smsto:"));
        intent.putExtra("sms_body", text);
        if (intent.resolveActivity(packageManager) == null) {
            result.reject("ERROR", "UNABLE_TO_RESOLVE_ACTIVITY");
            return;
        }

        currentActivity.startActivity(intent);

        result.resolve(null);
    }

    @ReactMethod
    public void sendWhatsAppMessage(String text, Promise result) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            result.reject("ERROR", "UNABLE_TO_ACQUIRE_CURRENT_ACTIVITY");
            return;
        }

        PackageManager packageManager = getReactApplicationContext().getPackageManager();

        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.setType("text/plain");
        intent.setPackage("com.whatsapp");
        intent.putExtra(Intent.EXTRA_TEXT, text);
        if (intent.resolveActivity(packageManager) == null) {
            result.reject("ERROR", "UNABLE_TO_RESOLVE_ACTIVITY");
            return;
        }

        currentActivity.startActivity(intent);

        result.resolve(null);
    }

    private Map<String, Boolean> hasApp(String appUri) {
        //        Activity currentActivity = getCurrentActivity();
        //        if (currentActivity == null) {
        //            resultMap.put(ERROR_FIELD, true);
        //            return resultMap;
        //        }
        //        PackageManager packageManager = currentActivity.getPackageManager();

        Map<String, Boolean> resultMap = new HashMap<>(2);
        resultMap.put(RESULT_FIELD, false);
        resultMap.put(ERROR_FIELD, false);

        PackageManager packageManager = getReactApplicationContext().getPackageManager();

        try {
            packageManager.getPackageInfo(appUri, PackageManager.GET_ACTIVITIES);
            resultMap.put(RESULT_FIELD, true);
        } catch (PackageManager.NameNotFoundException ignored) {}

        return resultMap;
    }
}
