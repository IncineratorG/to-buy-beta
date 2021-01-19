package com.tobuybeta.modules.app_widget.module_requests.requests;

import com.tobuybeta.modules.app_widget.common.constants.AppWidgetModuleConstants;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequestPayload;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;

import java.util.UUID;

public class OpenShoppingListRequest implements WidgetRequest {
    public String LIST_ID_PAYLOAD_FIELD = "listId";

    private String mId;
    private String mTimestamp;
    private String mType;
    private String mListId;
    private WidgetRequestPayload mPayload;

    public OpenShoppingListRequest(String listId) {
        mId = UUID.randomUUID().toString();
        mTimestamp = String.valueOf(System.currentTimeMillis());
        mType = WidgetRequestTypes.OPEN_SHOPPING_LIST_REQUEST;

        mPayload = new WidgetRequestPayload();
        if (listId.isEmpty()) {
            mPayload.set(LIST_ID_PAYLOAD_FIELD, AppWidgetModuleConstants.common.EMPTY_ID);
        } else {
            mPayload.set(LIST_ID_PAYLOAD_FIELD, listId);
        }
    }

    public OpenShoppingListRequest(String id, String type, String timestamp, String listId) {
        mId = id;
        mTimestamp = timestamp;
        mType = type;

        mPayload = new WidgetRequestPayload();
        mPayload.set(LIST_ID_PAYLOAD_FIELD, listId);
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

    @Override
    public WidgetRequestPayload payload() {
        return mPayload;
    }
}
