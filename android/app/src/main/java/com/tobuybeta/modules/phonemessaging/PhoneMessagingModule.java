package com.tobuybeta.modules.phonemessaging;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.tobuybeta.modules.modules_common.error.Error;
import com.tobuybeta.modules.phonemessaging.module_actions.payloads.PhoneMessagingJSActionPayloads;
import com.tobuybeta.modules.phonemessaging.module_actions.payloads.payloads.SendSmsMessagePayload;
import com.tobuybeta.modules.phonemessaging.module_actions.payloads.payloads.SendTelegramMessagePayload;
import com.tobuybeta.modules.phonemessaging.module_actions.payloads.payloads.SendWhatsAppMessagePayload;
import com.tobuybeta.modules.phonemessaging.module_actions.types.PhoneMessagingActionTypes;
import com.tobuybeta.modules.phonemessaging.module_errors.PhoneMessagingErrors;

import java.util.HashMap;
import java.util.Map;

public class PhoneMessagingModule extends ReactContextBaseJavaModule {
    private static final String TAG = "tag";

    private static final String ACTION_TYPE = "type";
    private static final String ACTION_PAYLOAD = "payload";

    private static final String RESULT_FIELD = "RESULT";
    private static final String ERROR_FIELD = "ERROR";

    private static final String SMS = "sms";
    private static final String WHATS_APP = "whatsApp";
    private static final String TELEGRAM = "telegram";

    private static final String WHATS_APP_URI = "com.whatsapp";
    private static final String TELEGRAM_URI = "org.telegram.messenger";

    public PhoneMessagingModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "PhoneMessaging";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        WritableMap actionTypesConstants = new WritableNativeMap();
        actionTypesConstants.putString(PhoneMessagingActionTypes.CHECK_SERVICE_AVAILABILITY, PhoneMessagingActionTypes.CHECK_SERVICE_AVAILABILITY);
        actionTypesConstants.putString(PhoneMessagingActionTypes.SEND_SMS_MESSAGE, PhoneMessagingActionTypes.SEND_SMS_MESSAGE);
        actionTypesConstants.putString(PhoneMessagingActionTypes.SEND_WHATS_APP_MESSAGE, PhoneMessagingActionTypes.SEND_WHATS_APP_MESSAGE);
        actionTypesConstants.putString(PhoneMessagingActionTypes.SEND_TELEGRAM_MESSAGE, PhoneMessagingActionTypes.SEND_TELEGRAM_MESSAGE);

        constants.put("actionTypes", actionTypesConstants);

        return constants;
    }

    @ReactMethod
    public void execute(ReadableMap action, Promise result) {
        if (action == null) {
            Error error = PhoneMessagingErrors.badAction();
            result.reject(error.code(), error.message());
            return;
        }

        final String type = action.getString(ACTION_TYPE);
        if (type == null) {
            Error error = PhoneMessagingErrors.badActionType();
            result.reject(error.code(), error.message());
            return;
        }

        switch (type) {
            case (PhoneMessagingActionTypes.CHECK_SERVICE_AVAILABILITY): {
                Map<String, Boolean> hasWhatsAppData = hasApp(WHATS_APP_URI);
                Map<String, Boolean> hasTelegramData = hasApp(TELEGRAM_URI);

                boolean smsAvailable = true;
                boolean whatsAppAvailable = false;
                if (hasWhatsAppData.containsKey(RESULT_FIELD)) {
                    whatsAppAvailable = hasWhatsAppData.get(RESULT_FIELD);
                }
                boolean telegramAvailable = false;
                if (hasTelegramData.containsKey(RESULT_FIELD)) {
                    telegramAvailable = hasTelegramData.get(RESULT_FIELD);
                }

                WritableMap resultMap = new WritableNativeMap();
                resultMap.putBoolean(SMS, smsAvailable);
                resultMap.putBoolean(WHATS_APP, whatsAppAvailable);
                resultMap.putBoolean(TELEGRAM, telegramAvailable);

                result.resolve(resultMap);
                break;
            }

            case (PhoneMessagingActionTypes.SEND_SMS_MESSAGE): {
                Activity currentActivity = getCurrentActivity();
                if (currentActivity == null) {
                    Error error = PhoneMessagingErrors.badCurrentActivity();
                    result.reject(error.code(), error.message());
                    return;
                }

                ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
                if (payloadMap == null) {
                    Error error = PhoneMessagingErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                SendSmsMessagePayload payload = PhoneMessagingJSActionPayloads
                        .sendSmsMessagePayload(payloadMap);
                if (!payload.isValid()) {
                    Error error = PhoneMessagingErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                PackageManager packageManager = currentActivity.getPackageManager();

                Intent intent = new Intent(Intent.ACTION_SENDTO);
                intent.setData(Uri.parse("smsto:"));
                intent.putExtra("sms_body", payload.messageText());
                if (intent.resolveActivity(packageManager) == null) {
                    Error error = PhoneMessagingErrors.unableToResolveActivity();
                    result.reject(error.code(), error.message());
                    return;
                }

                currentActivity.startActivity(intent);

                result.resolve(true);
                break;
            }

            case (PhoneMessagingActionTypes.SEND_WHATS_APP_MESSAGE): {
                Activity currentActivity = getCurrentActivity();
                if (currentActivity == null) {
                    Error error = PhoneMessagingErrors.badCurrentActivity();
                    result.reject(error.code(), error.message());
                    return;
                }

                ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
                if (payloadMap == null) {
                    Error error = PhoneMessagingErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                SendWhatsAppMessagePayload payload = PhoneMessagingJSActionPayloads
                        .sendWhatsAppMessagePayload(payloadMap);
                if (!payload.isValid()) {
                    Error error = PhoneMessagingErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                PackageManager packageManager = getReactApplicationContext().getPackageManager();

                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.setType("text/plain");
                intent.setPackage(WHATS_APP_URI);
                intent.putExtra(Intent.EXTRA_TEXT, payload.messageText());
                if (intent.resolveActivity(packageManager) == null) {
                    Error error = PhoneMessagingErrors.unableToResolveActivity();
                    result.reject(error.code(), error.message());
                    return;
                }

                currentActivity.startActivity(intent);

                result.resolve(true);
                break;
            }

            case (PhoneMessagingActionTypes.SEND_TELEGRAM_MESSAGE): {
                Activity currentActivity = getCurrentActivity();
                if (currentActivity == null) {
                    Error error = PhoneMessagingErrors.badCurrentActivity();
                    result.reject(error.code(), error.message());
                    return;
                }

                ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
                if (payloadMap == null) {
                    Error error = PhoneMessagingErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                SendTelegramMessagePayload payload = PhoneMessagingJSActionPayloads
                        .sendTelegramMessagePayload(payloadMap);
                if (!payload.isValid()) {
                    Error error = PhoneMessagingErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                PackageManager packageManager = getReactApplicationContext().getPackageManager();

                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.setType("text/plain");
                intent.setPackage(TELEGRAM_URI);
                intent.putExtra(Intent.EXTRA_TEXT, payload.messageText());
                if (intent.resolveActivity(packageManager) == null) {
                    Error error = PhoneMessagingErrors.unableToResolveActivity();
                    result.reject(error.code(), error.message());
                    return;
                }

                currentActivity.startActivity(intent);

                result.resolve(true);
                break;
            }

            default: {
                Error error = PhoneMessagingErrors.unknownActionType();
                result.reject(error.code(), error.message());
            }
        }
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

//    @ReactMethod
//    public void checkServicesAvailability(Promise promise) {
//        Map<String, Boolean> hasWhatsAppData = hasApp(WHATS_APP_URI);
//        Map<String, Boolean> hasTelegramData = hasApp(TELEGRAM_URI);
//
//        boolean smsAvailable = true;
//        boolean whatsAppAvailable = false;
//        if (hasWhatsAppData.containsKey(RESULT_FIELD)) {
//            whatsAppAvailable = hasWhatsAppData.get(RESULT_FIELD);
//        }
//        boolean telegramAvailable = false;
//        if (hasTelegramData.containsKey(RESULT_FIELD)) {
//            telegramAvailable = hasTelegramData.get(RESULT_FIELD);
//        }
//
//        WritableMap resultMap = new WritableNativeMap();
//        resultMap.putBoolean(SMS, smsAvailable);
//        resultMap.putBoolean(WHATS_APP, whatsAppAvailable);
//        resultMap.putBoolean(TELEGRAM, telegramAvailable);
//
//        promise.resolve(resultMap);
//    }
//
//    @ReactMethod
//    public void sendSmsMessage(String text, Promise result) {
//        Activity currentActivity = getCurrentActivity();
//        if (currentActivity == null) {
//            result.reject("ERROR", "UNABLE_TO_ACQUIRE_CURRENT_ACTIVITY");
//            return;
//        }
//
//        PackageManager packageManager = currentActivity.getPackageManager();
//
//        Intent intent = new Intent(Intent.ACTION_SENDTO);
//        intent.setData(Uri.parse("smsto:"));
//        intent.putExtra("sms_body", text);
//        if (intent.resolveActivity(packageManager) == null) {
//            result.reject("ERROR", "UNABLE_TO_RESOLVE_ACTIVITY");
//            return;
//        }
//
//        currentActivity.startActivity(intent);
//
//        result.resolve(null);
//    }
//
//    @ReactMethod
//    public void sendWhatsAppMessage(String text, Promise result) {
//        Activity currentActivity = getCurrentActivity();
//        if (currentActivity == null) {
//            result.reject("ERROR", "UNABLE_TO_ACQUIRE_CURRENT_ACTIVITY");
//            return;
//        }
//
//        PackageManager packageManager = getReactApplicationContext().getPackageManager();
//
//        Intent intent = new Intent(Intent.ACTION_SEND);
//        intent.setType("text/plain");
//        intent.setPackage(WHATS_APP_URI);
//        intent.putExtra(Intent.EXTRA_TEXT, text);
//        if (intent.resolveActivity(packageManager) == null) {
//            result.reject("ERROR", "UNABLE_TO_RESOLVE_ACTIVITY");
//            return;
//        }
//
//        currentActivity.startActivity(intent);
//
//        result.resolve(null);
//    }
//
//    @ReactMethod
//    public void sendTelegramMessage(String text, Promise result) {
//        Activity currentActivity = getCurrentActivity();
//        if (currentActivity == null) {
//            result.reject("ERROR", "UNABLE_TO_ACQUIRE_CURRENT_ACTIVITY");
//            return;
//        }
//
//        PackageManager packageManager = getReactApplicationContext().getPackageManager();
//
//        Intent intent = new Intent(Intent.ACTION_SEND);
//        intent.setType("text/plain");
//        intent.setPackage(TELEGRAM_URI);
//        intent.putExtra(Intent.EXTRA_TEXT, text);
//        if (intent.resolveActivity(packageManager) == null) {
//            result.reject("ERROR", "UNABLE_TO_RESOLVE_ACTIVITY");
//            return;
//        }
//
//        currentActivity.startActivity(intent);
//
//        result.resolve(null);
//    }
}
