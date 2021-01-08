package com.tobuybeta.modules.app_widget.module_requests.requests;

import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;

public class OpenShoppingListRequest implements WidgetRequest {
    private String mTimestamp;
    private String mType;
    private String mListId;

    public OpenShoppingListRequest(String listId) {
        mTimestamp = String.valueOf(System.currentTimeMillis());
        mType = WidgetRequestTypes.OPEN_SHOPPING_LIST_REQUEST;
        if (listId.isEmpty()) {
            mListId = "-1";
        } else {
            mListId = listId;
        }
    }

    public OpenShoppingListRequest(String type, String timestamp, String listId) {
        this.mTimestamp = timestamp;
        this.mType = type;
        mListId = listId;
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
