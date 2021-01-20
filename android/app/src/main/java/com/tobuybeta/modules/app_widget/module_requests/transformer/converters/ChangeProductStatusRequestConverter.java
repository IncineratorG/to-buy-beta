package com.tobuybeta.modules.app_widget.module_requests.transformer.converters;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.tobuybeta.modules.app_widget.common.constants.AppWidgetModuleConstants;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequestConverter;
import com.tobuybeta.modules.app_widget.module_requests.fields.WidgetRequestFields;
import com.tobuybeta.modules.app_widget.module_requests.requests.ChangeProductStatusRequest;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;

public class ChangeProductStatusRequestConverter implements WidgetRequestConverter {
    private String SEPARATOR = AppWidgetModuleConstants.common.SEPARATOR;
    private int ID_FIELD_INDEX = AppWidgetModuleConstants.widgetRequest.ID_FIELD_INDEX;
    private int TIMESTAMP_FIELD_INDEX = AppWidgetModuleConstants.widgetRequest.TIMESTAMP_FIELD_INDEX;
    private int TYPE_FIELD_INDEX = AppWidgetModuleConstants.widgetRequest.TYPE_FIELD_INDEX;
    private int LIST_ID_FIELD_INDEX = 3;
    private int PRODUCT_ID_FIELD_INDEX = 4;
    private int PRODUCT_STATUS_FIELD_INDEX = 5;

    @Override
    public String toString(WidgetRequest request) {
        if (!(request instanceof ChangeProductStatusRequest)) {
            return null;
        }

        ChangeProductStatusRequest changeProductStatusRequest = (ChangeProductStatusRequest) request;

        String listId = changeProductStatusRequest.listId();
        String productId = changeProductStatusRequest.productId();
        String productStatus = changeProductStatusRequest.productStatus();

        return changeProductStatusRequest.id()
                + SEPARATOR
                + changeProductStatusRequest.timestamp()
                + SEPARATOR
                + changeProductStatusRequest.type()
                + SEPARATOR
                + listId
                + SEPARATOR
                + productId
                + SEPARATOR
                + productStatus;
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

        if (!requestType.equalsIgnoreCase(WidgetRequestTypes.CHANGE_PRODUCT_STATUS_REQUEST)) {
            return null;
        }

        if (requestDataArray.length < 6) {
            return null;
        }

        String listId = requestDataArray[LIST_ID_FIELD_INDEX];
        String productId = requestDataArray[PRODUCT_ID_FIELD_INDEX];
        String productStatus = requestDataArray[PRODUCT_STATUS_FIELD_INDEX];

        return new ChangeProductStatusRequest(
                requestId,
                requestType,
                requestTimestamp,
                listId,
                productId,
                productStatus
        );
    }

    @Override
    public WritableMap toJsObject(WidgetRequest request) {
        if (!(request instanceof ChangeProductStatusRequest)) {
            return null;
        }

        ChangeProductStatusRequest changeProductStatusRequest = (ChangeProductStatusRequest) request;
        String id = changeProductStatusRequest.id();
        String type = changeProductStatusRequest.type();
        String timestamp = changeProductStatusRequest.timestamp();
        String listId = changeProductStatusRequest.listId();
        String productId = changeProductStatusRequest.productId();
        String productStatus = changeProductStatusRequest.productStatus();

        WritableMap jsObjectMap = new WritableNativeMap();
        jsObjectMap.putString(WidgetRequestFields.ID, id);
        jsObjectMap.putString(WidgetRequestFields.TYPE, type);
        jsObjectMap.putString(WidgetRequestFields.TIMESTAMP, timestamp);
        jsObjectMap.putString(WidgetRequestFields.LIST_ID, listId);
        jsObjectMap.putString(WidgetRequestFields.PRODUCT_ID, productId);
        jsObjectMap.putString(WidgetRequestFields.PRODUCT_STATUS, productStatus);

        return jsObjectMap;
    }
}
