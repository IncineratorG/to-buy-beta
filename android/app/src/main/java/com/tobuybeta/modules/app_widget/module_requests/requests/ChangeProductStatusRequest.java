package com.tobuybeta.modules.app_widget.module_requests.requests;

import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;

import java.util.UUID;

public class ChangeProductStatusRequest implements WidgetRequest {
    private String mId;
    private String mTimestamp;
    private String mType;
    private String mListId;
    private String mProductId;
    private String mProductStatus;

    public ChangeProductStatusRequest(String listId, String productId, String productStatus) {
        mId = UUID.randomUUID().toString();
        mTimestamp = String.valueOf(System.currentTimeMillis());
        mType = WidgetRequestTypes.CHANGE_PRODUCT_STATUS_REQUEST;

        mListId = listId;
        mProductId = productId;
        mProductStatus = productStatus;
    }

    public ChangeProductStatusRequest(String id,
                                      String type,
                                      String timestamp,
                                      String listId,
                                      String productId,
                                      String productStatus) {
        mId = id;
        mTimestamp = timestamp;
        mType = type;

        mListId = listId;
        mProductId = productId;
        mProductStatus = productStatus;
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

    public String productId() {
        return mProductId;
    }

    public String productStatus() {
        return mProductStatus;
    }
}
