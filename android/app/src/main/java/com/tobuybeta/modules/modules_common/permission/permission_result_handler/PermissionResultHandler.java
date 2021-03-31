package com.tobuybeta.modules.modules_common.permission.permission_result_handler;

import android.content.pm.PackageManager;

import com.tobuybeta.modules.modules_common.permission.permission_callback.PermissionCallback;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class PermissionResultHandler {
    private int mCallbackIds;
    private Map<Integer, PermissionCallback> mCallbackIdsMap;
    private Map<Integer, Integer> mCallbackIdsPermissionsMap;
    private Map<Integer, List<Integer>> mPermissionCallbacksMap;
    private Set<Integer> mSingleShotCallbacks;

    public PermissionResultHandler() {
        mCallbackIds = 1;

        mCallbackIdsMap = new HashMap<>();
        mCallbackIdsPermissionsMap = new HashMap<>();
        mPermissionCallbacksMap = new HashMap<>();

        mSingleShotCallbacks = new HashSet<>();
    }

    public int addCallback(int permissionRequestCode, PermissionCallback callback) {
        int callbackId = ++mCallbackIds;

        List<Integer> currentPermissionCallbackIds = mPermissionCallbacksMap.get(permissionRequestCode);
        if (currentPermissionCallbackIds == null) {
            currentPermissionCallbackIds = new ArrayList<>();
        }
        currentPermissionCallbackIds.add(callbackId);

        mCallbackIdsMap.put(callbackId, callback);
        mCallbackIdsPermissionsMap.put(callbackId, permissionRequestCode);
        mPermissionCallbacksMap.put(permissionRequestCode, currentPermissionCallbackIds);

        return callbackId;
    }

    public int addSingleShotCallback(int permissionCode, PermissionCallback callback) {
        int callbackId = addCallback(permissionCode, callback);
        mSingleShotCallbacks.add(callbackId);

        return callbackId;
    }

    public void removeCallback(int callbackId) {
        Integer callbackPermissionCode = mCallbackIdsPermissionsMap.get(callbackId);
        if (callbackPermissionCode == null) {
            return;
        }

        mCallbackIdsMap.remove(callbackId);
        mCallbackIdsPermissionsMap.remove(callbackId);

        List<Integer> permissionCallbacks = mPermissionCallbacksMap.get(callbackPermissionCode);
        if (permissionCallbacks == null) {
            return;
        }

        List<Integer> updatedPermissionCallbacks = new ArrayList<>(permissionCallbacks.size());
        for (int i = 0; i < permissionCallbacks.size(); ++i) {
            if (permissionCallbacks.get(i) != callbackId) {
                updatedPermissionCallbacks.add(permissionCallbacks.get(i));
            }
        }
        mPermissionCallbacksMap.put(callbackPermissionCode, updatedPermissionCallbacks);
    }

    public void onResult(int requestCode, String[] permissions, int[] grantResults) {
        List<Integer> callbackIds = mPermissionCallbacksMap.get(requestCode);
        if (callbackIds == null) {
            return;
        }

        for (int i = 0; i < callbackIds.size(); ++i) {
            int callbackId = callbackIds.get(i);
            PermissionCallback callback = mCallbackIdsMap.get(callbackId);
            if (callback == null) {
                continue;
            }

            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                callback.onGranted();
            } else {
                callback.onDenied();
            }
        }

        for (int i = 0; i < callbackIds.size(); ++i) {
            if (mSingleShotCallbacks.contains(callbackIds.get(i))) {
                removeCallback(callbackIds.get(i));
                mSingleShotCallbacks.remove(callbackIds.get(i));
            }
        }
    }
}
