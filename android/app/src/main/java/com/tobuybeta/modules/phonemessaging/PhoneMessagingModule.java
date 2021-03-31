package com.tobuybeta.modules.phonemessaging;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.PermissionListener;
import com.tobuybeta.modules.modules_common.permission.permission_callback.PermissionCallback;
import com.tobuybeta.modules.modules_common.permission.permission_result_handler.PermissionResultHandler;
import com.tobuybeta.modules.phonemessaging.module_actions.types.PhoneMessagingActionTypes;
import com.tobuybeta.modules.phonemessaging.module_actions_executor.PhoneMessagingJSActionsExecutor;

import java.util.HashMap;
import java.util.Map;

public class PhoneMessagingModule extends ReactContextBaseJavaModule {
    private static final String t = "tag";

    private ReactApplicationContext mContext;
    private PhoneMessagingJSActionsExecutor mActionsExecutor;

    private PermissionResultHandler mPermissionsResultHandler;

    public PhoneMessagingModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        mActionsExecutor = new PhoneMessagingJSActionsExecutor(this, mContext);

        mPermissionsResultHandler = new PermissionResultHandler();
    }

//    public int addPermissionCallback(int permissionRequestCode, PermissionCallback callback, boolean singleShot) {
//        int callbackId = -1;
//
//        if (singleShot) {
//            callbackId = mPermissionsResultHandler.addSingleShotCallback(permissionRequestCode, callback);
//        } else {
//            callbackId = mPermissionsResultHandler.addCallback(permissionRequestCode, callback);
//        }
//
//        return callbackId;
//    }

//    @Override
//    public boolean onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
//        Log.d(t, "onRequestPermissionsResult()");
//
//        mPermissionsResultHandler.onResult(requestCode, permissions, grantResults);
//
//        return true;
//    }

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
        actionTypesConstants.putString(PhoneMessagingActionTypes.GET_SMS_INBOX, PhoneMessagingActionTypes.GET_SMS_INBOX);

        constants.put("actionTypes", actionTypesConstants);

        return constants;
    }

    @ReactMethod
    public void execute(ReadableMap action, Promise result) {
        mActionsExecutor.execute(action, result);
    }
}
