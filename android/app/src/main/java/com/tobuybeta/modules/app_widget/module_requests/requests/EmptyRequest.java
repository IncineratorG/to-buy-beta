package com.tobuybeta.modules.app_widget.module_requests.requests;

import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;

import java.util.UUID;

public class EmptyRequest implements WidgetRequest {
    private String mId;
    private String mTimestamp;
    private String mType;

    public EmptyRequest() {
        mId = UUID.randomUUID().toString();
        mTimestamp = String.valueOf(System.currentTimeMillis());
        mType = WidgetRequestTypes.EMPTY_REQUEST;
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
}
