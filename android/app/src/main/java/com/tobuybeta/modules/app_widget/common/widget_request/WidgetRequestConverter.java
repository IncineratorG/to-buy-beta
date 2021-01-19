package com.tobuybeta.modules.app_widget.common.widget_request;

import com.facebook.react.bridge.WritableMap;

public interface WidgetRequestConverter {
    String toString(WidgetRequest request);
    WidgetRequest fromString(String stringifiedRequest);
    WritableMap toJsObject(WidgetRequest request);
}
