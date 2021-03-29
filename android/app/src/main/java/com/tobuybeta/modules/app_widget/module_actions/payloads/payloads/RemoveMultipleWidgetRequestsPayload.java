package com.tobuybeta.modules.app_widget.module_actions.payloads.payloads;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.tobuybeta.modules.modules_common.js_payload.JSPayload;

import java.util.ArrayList;
import java.util.List;

public class RemoveMultipleWidgetRequestsPayload implements JSPayload {
    private String WIDGET_REQUEST_IDS_ARRAY_FIELD = "widgetRequestIdsArray";
    private List<String> mRequestIds;
    private boolean mIsValid;

    public RemoveMultipleWidgetRequestsPayload(ReadableMap readableMap) {
        mRequestIds = new ArrayList<>();

        ReadableArray widgetRequestsIdsArray = readableMap.getArray(WIDGET_REQUEST_IDS_ARRAY_FIELD);
        if (widgetRequestsIdsArray == null) {
            mIsValid = false;
            return;
        }

        for (int i = 0; i < widgetRequestsIdsArray.size(); ++i) {
            String requestId = widgetRequestsIdsArray.getString(i);
            mRequestIds.add(requestId);
        }

        mIsValid = true;
    }

    @Override
    public boolean isValid() {
        return mIsValid;
    }

    public List<String> requestIds() {
        return mRequestIds;
    }
}
