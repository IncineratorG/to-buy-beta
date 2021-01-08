package com.tobuybeta.modules.app_widget.module_requests.requests;

import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;

public class MarkProductAsBoughtRequest implements WidgetRequest {
    private String mTimestamp;
    private String mType;
    private String mListId;
    private String mProductId;

    public MarkProductAsBoughtRequest(String listId, String productId) {
        mTimestamp = String.valueOf(System.currentTimeMillis());
        mType = WidgetRequestTypes.MARK_PRODUCT_AS_BOUGHT_REQUEST;
        mListId = listId;
        mProductId = productId;
    }

    public MarkProductAsBoughtRequest(String type, String timestamp, String listId, String productId) {
        mTimestamp = timestamp;
        mType = type;
        mListId = listId;
        mProductId = productId;
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

    public String productId() {
        return mProductId;
    }
}
