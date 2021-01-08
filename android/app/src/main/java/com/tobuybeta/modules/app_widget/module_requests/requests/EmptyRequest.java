package com.tobuybeta.modules.app_widget.module_requests.requests;

import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;

/**
 * TODO: Add a class header comment
 */

public class EmptyRequest implements WidgetRequest {
    private String mTimestamp;
    private String mType;

    public EmptyRequest() {
        mTimestamp = String.valueOf(System.currentTimeMillis());
        mType = WidgetRequestTypes.EMPTY_REQUEST;
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
