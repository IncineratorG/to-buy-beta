package com.tobuybeta.modules.app_widget.module_requests.requests;

import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequestPayload;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;

import java.util.UUID;

public class MarkProductAsBoughtRequest implements WidgetRequest {
    public String LIST_ID_PAYLOAD_FIELD = "listId";
    public String PRODUCT_ID_PAYLOAD_FIELD = "productId";

    private String mId;
    private String mTimestamp;
    private String mType;
    private WidgetRequestPayload mPayload;

    public MarkProductAsBoughtRequest(String listId, String productId) {
        mId = UUID.randomUUID().toString();
        mTimestamp = String.valueOf(System.currentTimeMillis());
        mType = WidgetRequestTypes.MARK_PRODUCT_AS_BOUGHT_REQUEST;

        mPayload = new WidgetRequestPayload();
        mPayload.set(LIST_ID_PAYLOAD_FIELD, listId);
        mPayload.set(PRODUCT_ID_PAYLOAD_FIELD, productId);
    }

    public MarkProductAsBoughtRequest(String id,
                                      String type,
                                      String timestamp,
                                      String listId,
                                      String productId) {
        mId = id;
        mTimestamp = timestamp;
        mType = type;

        mPayload = new WidgetRequestPayload();
        mPayload.set(LIST_ID_PAYLOAD_FIELD, listId);
        mPayload.set(PRODUCT_ID_PAYLOAD_FIELD, productId);
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
