package com.tobuybeta.modules.phonemessaging.module_actions_executor;


import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.util.Log;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.tobuybeta.modules.modules_common.error.Error;
import com.tobuybeta.modules.modules_common.js_actions_executor.JSActionsExecutor;
import com.tobuybeta.modules.modules_common.permission.permission_callback.PermissionCallback;
import com.tobuybeta.modules.modules_common.permission.permission_result_handler.PermissionResultHandler;
import com.tobuybeta.modules.phonemessaging.PhoneMessagingModule;
import com.tobuybeta.modules.phonemessaging.module_actions.payloads.PhoneMessagingJSActionPayloads;
import com.tobuybeta.modules.phonemessaging.module_actions.payloads.payloads.SendSmsMessagePayload;
import com.tobuybeta.modules.phonemessaging.module_actions.payloads.payloads.SendTelegramMessagePayload;
import com.tobuybeta.modules.phonemessaging.module_actions.payloads.payloads.SendWhatsAppMessagePayload;
import com.tobuybeta.modules.phonemessaging.module_actions.types.PhoneMessagingActionTypes;
import com.tobuybeta.modules.phonemessaging.module_errors.PhoneMessagingErrors;

import java.util.HashMap;
import java.util.Map;

public class PhoneMessagingJSActionsExecutor implements JSActionsExecutor {
    private static final String t = "tag";

    private PhoneMessagingModule mModule;
    private ReactApplicationContext mContext;

    public static final int MY_PERMISSIONS_REQUEST_READ_CONTACTS = 111;

    private static final String ACTION_TYPE = "type";
    private static final String ACTION_PAYLOAD = "payload";

    private static final String RESULT_FIELD = "RESULT";
    private static final String ERROR_FIELD = "ERROR";

    private static final String SMS = "sms";
    private static final String WHATS_APP = "whatsApp";
    private static final String TELEGRAM = "telegram";

    private static final String WHATS_APP_URI = "com.whatsapp";
    private static final String TELEGRAM_URI = "org.telegram.messenger";

    public PhoneMessagingJSActionsExecutor(PhoneMessagingModule module,
                                           ReactApplicationContext context) {
        mModule = module;
        mContext = context;
    }

    @Override
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
                Activity currentActivity = mContext.getCurrentActivity();
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
                Activity currentActivity = mContext.getCurrentActivity();
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

                PackageManager packageManager = mContext.getPackageManager();

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
                Activity currentActivity = mContext.getCurrentActivity();
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

                PackageManager packageManager = mContext.getPackageManager();

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

            // ===
            case (PhoneMessagingActionTypes.GET_SMS_INBOX): {
                Log.d(t, "GET_SMS_INBOX");

                PermissionAwareActivity currentActivity = (PermissionAwareActivity) mContext.getCurrentActivity();
                if (currentActivity == null) {
                    Log.d(t, "ACTIVITY_IS_NULL");
                    break;
                }

                int permissionCheck = currentActivity.checkSelfPermission(android.Manifest.permission.READ_SMS);
                if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
                    Log.d(t, "PERMISSION_NOT_GRANTED->WILL_REQUEST");

                    currentActivity.requestPermissions(
                            new String[]{android.Manifest.permission.READ_SMS},
                            MY_PERMISSIONS_REQUEST_READ_CONTACTS,
                            (requestCode, permissions, grantResults) -> {
                                if (requestCode == MY_PERMISSIONS_REQUEST_READ_CONTACTS) {
                                    if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                                        Log.d(t, "onRequestPermissionsResult(): PERMISSION_GRANTED");
                                    } else {
                                        Log.d(t, "onRequestPermissionsResult(): PERMISSION_DENIED");
                                    }
                                } else {
                                    Log.d(t, "onRequestPermissionsResult(): ANOTHER_REQUEST_CODE");
                                }

                                return true;
                            }
                    );
                } else {
                    Log.d(t, "PERMISSION_GRANTED->WILL_RETRIEVE_SMS");

                    Uri uriSms = Uri.parse("content://sms/inbox");
                    Cursor cursor = mContext
                            .getContentResolver()
                            .query(
                                    uriSms,
                                    new String[]{"_id", "thread_id", "address", "date", "body"},
                                    null,
                                    null,
                                    null
                            );

                    if (cursor == null) {
                        Log.d(t, "CURSOR_IS_NULL");
                        break;
                    }

                    cursor.moveToFirst();
                    while (cursor.moveToNext())
                    {
                        String threadId = cursor.getString(1);
                        String address = cursor.getString(2);
                        String body = cursor.getString(4);

                        Log.d(t, "THREAD_ID: " + threadId);
                        Log.d(t, "MOBILE_NUMBER: " + address);
                        Log.d(t, "TEXT: " + body);
                        Log.d(t, "");
                    }

                    cursor.close();
                }

                break;
            }
            // ===

            default: {
                Error error = PhoneMessagingErrors.unknownActionType();
                result.reject(error.code(), error.message());
            }
        }
    }

//    @Override
//    public boolean onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
//        Log.d(t, "onRequestPermissionsResult()");
//
//        switch (requestCode) {
//            case MY_PERMISSIONS_REQUEST_READ_CONTACTS: {
//                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//                    Log.d(t, "onRequestPermissionsResult(): PERMISSION_GRANTED");
//                } else {
//                    Log.d(t, "onRequestPermissionsResult(): PERMISSION_DENIED");
//                }
//            }
//        }
//
//        return true;
//    }

    private Map<String, Boolean> hasApp(String appUri) {
        Map<String, Boolean> resultMap = new HashMap<>(2);
        resultMap.put(RESULT_FIELD, false);
        resultMap.put(ERROR_FIELD, false);

        PackageManager packageManager = mContext.getPackageManager();

        try {
            packageManager.getPackageInfo(appUri, PackageManager.GET_ACTIVITIES);
            resultMap.put(RESULT_FIELD, true);
        } catch (PackageManager.NameNotFoundException ignored) {}

        return resultMap;
    }
}
