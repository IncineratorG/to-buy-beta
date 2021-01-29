package com.tobuybeta.modules.app_widget.storage.events.payloads;

import android.content.Context;

import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;

public class WidgetRequestSetEventPayload {
    private Context mContext;
    private WidgetRequest mRequest;

    public WidgetRequestSetEventPayload(Context context, WidgetRequest request) {
        mContext = context;
        mRequest = request;
    }

    public Context context() {
        return mContext;
    }

    public WidgetRequest request() {
        return mRequest;
    }
}
