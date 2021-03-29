package com.tobuybeta.modules.app_widget.module_requests.transformer.converters;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.tobuybeta.modules.app_widget.module_constants.AppWidgetModuleConstants;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequestConverter;
import com.tobuybeta.modules.app_widget.module_requests.fields.WidgetRequestFields;
import com.tobuybeta.modules.app_widget.module_requests.requests.MarkProductAsBoughtRequest;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;

public class MarkProductAsBoughtRequestConverter implements WidgetRequestConverter {
    private String SEPARATOR = AppWidgetModuleConstants.common.SEPARATOR;
    private int ID_FIELD_INDEX = AppWidgetModuleConstants.widgetRequest.ID_FIELD_INDEX;
    private int TIMESTAMP_FIELD_INDEX = AppWidgetModuleConstants.widgetRequest.TIMESTAMP_FIELD_INDEX;
    private int TYPE_FIELD_INDEX = AppWidgetModuleConstants.widgetRequest.TYPE_FIELD_INDEX;
    private int LIST_ID_FIELD_INDEX = 3;
    private int PRODUCT_ID_FIELD_INDEX = 4;

    @Override
    public String toString(WidgetRequest request) {
        if (!(request instanceof MarkProductAsBoughtRequest)) {
            return null;
        }

        MarkProductAsBoughtRequest markProductAsBoughtRequest = (MarkProductAsBoughtRequest) request;

        String listId = markProductAsBoughtRequest.listId();
        String productId = markProductAsBoughtRequest.productId();

        return markProductAsBoughtRequest.id()
                + SEPARATOR
                + markProductAsBoughtRequest.timestamp()
                + SEPARATOR
                + markProductAsBoughtRequest.type()
                + SEPARATOR
                + listId
                + SEPARATOR
                + productId;
    }

    @Override
    public WidgetRequest fromString(String stringifiedRequest) {
        if (stringifiedRequest.isEmpty()) {
            return null;
        }

        String[] requestDataArray = stringifiedRequest.split(SEPARATOR);
        if (requestDataArray.length < 3) {
            return null;
        }

        String requestId = requestDataArray[ID_FIELD_INDEX];
        String requestType = requestDataArray[TYPE_FIELD_INDEX];
        String requestTimestamp = requestDataArray[TIMESTAMP_FIELD_INDEX];

        if (!requestType.equalsIgnoreCase(WidgetRequestTypes.MARK_PRODUCT_AS_BOUGHT_REQUEST)) {
            return null;
        }

        if (requestDataArray.length < 5) {
            return null;
        }

        String listId = requestDataArray[LIST_ID_FIELD_INDEX];
        String productId = requestDataArray[PRODUCT_ID_FIELD_INDEX];

        return new MarkProductAsBoughtRequest(requestId, requestType, requestTimestamp, listId, productId);
    }

    @Override
    public WritableMap toJsObject(WidgetRequest request) {
        if (!(request instanceof MarkProductAsBoughtRequest)) {
            return null;
        }

        MarkProductAsBoughtRequest markProductAsBoughtRequest = (MarkProductAsBoughtRequest) request;
        String id = markProductAsBoughtRequest.id();
        String type = markProductAsBoughtRequest.type();
        String timestamp = markProductAsBoughtRequest.timestamp();
        String listId = markProductAsBoughtRequest.listId();
        String productId = markProductAsBoughtRequest.productId();

        WritableMap jsObjectMap = new WritableNativeMap();
        jsObjectMap.putString(WidgetRequestFields.ID, id);
        jsObjectMap.putString(WidgetRequestFields.TYPE, type);
        jsObjectMap.putString(WidgetRequestFields.TIMESTAMP, timestamp);
        jsObjectMap.putString(WidgetRequestFields.LIST_ID, listId);
        jsObjectMap.putString(WidgetRequestFields.PRODUCT_ID, productId);

        return jsObjectMap;
    }
}
