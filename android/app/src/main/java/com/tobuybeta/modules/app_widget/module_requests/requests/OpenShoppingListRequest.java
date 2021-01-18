package com.tobuybeta.modules.app_widget.module_requests.requests;

import com.tobuybeta.modules.app_widget.common.constants.AppWidgetModuleConstants;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;

import java.util.UUID;

public class OpenShoppingListRequest implements WidgetRequest {
    private String mId;
    private String mTimestamp;
    private String mType;
    private String mListId;

    public OpenShoppingListRequest(String listId) {
        mId = UUID.randomUUID().toString();
        mTimestamp = String.valueOf(System.currentTimeMillis());
        mType = WidgetRequestTypes.OPEN_SHOPPING_LIST_REQUEST;
        if (listId.isEmpty()) {
            mListId = AppWidgetModuleConstants.common.EMPTY_ID;
        } else {
            mListId = listId;
        }
    }

    public OpenShoppingListRequest(String id, String type, String timestamp, String listId) {
        mId = id;
        mTimestamp = timestamp;
        mType = type;
        mListId = listId;
    }

    @Override
    public String id() {
        return mId;
    }

    @Override
    public String timestamp() {
        return mTimestamp;
    }

    @Override
    public String type() {
        return mType;
    }

    public String listId() {
        return mListId;
    }
}
