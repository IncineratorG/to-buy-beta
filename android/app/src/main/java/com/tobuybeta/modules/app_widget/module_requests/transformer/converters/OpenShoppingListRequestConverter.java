package com.tobuybeta.modules.app_widget.module_requests.transformer.converters;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.tobuybeta.modules.app_widget.common.constants.AppWidgetModuleConstants;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequestConverter;
import com.tobuybeta.modules.app_widget.module_requests.fields.WidgetRequestFields;
import com.tobuybeta.modules.app_widget.module_requests.requests.OpenShoppingListRequest;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;

public class OpenShoppingListRequestConverter implements WidgetRequestConverter {
    private String SEPARATOR = AppWidgetModuleConstants.common.SEPARATOR;
    private int ID_FIELD_INDEX = AppWidgetModuleConstants.widgetRequest.ID_FIELD_INDEX;
    private int TIMESTAMP_FIELD_INDEX = AppWidgetModuleConstants.widgetRequest.TIMESTAMP_FIELD_INDEX;
    private int TYPE_FIELD_INDEX = AppWidgetModuleConstants.widgetRequest.TYPE_FIELD_INDEX;
    private int LIST_ID_FIELD_INDEX = 3;

    @Override
    public String toString(WidgetRequest request) {
        if (!(request instanceof OpenShoppingListRequest)) {
            return null;
        }

        OpenShoppingListRequest openShoppingListRequest = (OpenShoppingListRequest) request;

        String listId = openShoppingListRequest.listId();

        return openShoppingListRequest.id()
                + SEPARATOR
                + openShoppingListRequest.timestamp()
                + SEPARATOR
                + openShoppingListRequest.type()
                + SEPARATOR
                + listId;
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

        if (!requestType.equalsIgnoreCase(WidgetRequestTypes.OPEN_SHOPPING_LIST_REQUEST)) {
            return null;
        }

        if (requestDataArray.length < 4) {
            return null;
        }

        String listId = requestDataArray[LIST_ID_FIELD_INDEX];

        return new OpenShoppingListRequest(requestId, requestType, requestTimestamp, listId);
    }

    @Override
    public WritableMap toJsObject(WidgetRequest request) {
        if (!(request instanceof OpenShoppingListRequest)) {
            return null;
        }

        OpenShoppingListRequest openShoppingListRequest = (OpenShoppingListRequest) request;
        String id = openShoppingListRequest.id();
        String type = openShoppingListRequest.type();
        String timestamp = openShoppingListRequest.timestamp();
        String listId = openShoppingListRequest.listId();

        WritableMap jsObjectMap = new WritableNativeMap();
        jsObjectMap.putString(WidgetRequestFields.ID, id);
        jsObjectMap.putString(WidgetRequestFields.TYPE, type);
        jsObjectMap.putString(WidgetRequestFields.TIMESTAMP, timestamp);
        jsObjectMap.putString(WidgetRequestFields.LIST_ID, listId);

        return jsObjectMap;
    }
}
