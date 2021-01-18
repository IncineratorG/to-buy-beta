package com.tobuybeta.modules.app_widget.module_requests.transformer;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.module_requests.fields.WidgetRequestFields;
import com.tobuybeta.modules.app_widget.module_requests.requests.EmptyRequest;
import com.tobuybeta.modules.app_widget.module_requests.requests.MarkProductAsBoughtRequest;
import com.tobuybeta.modules.app_widget.module_requests.requests.OpenShoppingListRequest;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;

public class WidgetRequestTransformer {
    private static final String SEPARATOR = " ";
    private static int ID_FIELD_INDEX = 0;
    private static int TIMESTAMP_FIELD_INDEX = 1;
    private static int TYPE_FIELD_INDEX = 2;
    private static int LIST_ID_FIELD_INDEX = 3;
    private static int PRODUCT_ID_FIELD_INDEX = 4;

    public static String toString(WidgetRequest request) {
        String stringifiedRequest = "";

        if (request instanceof OpenShoppingListRequest) {
            OpenShoppingListRequest openShoppingListRequest = (OpenShoppingListRequest) request;
            stringifiedRequest =
                    openShoppingListRequest.id()
                    + SEPARATOR
                    + openShoppingListRequest.timestamp()
                    + SEPARATOR
                    + openShoppingListRequest.type()
                    + SEPARATOR
                    + openShoppingListRequest.listId();
        } else if (request instanceof MarkProductAsBoughtRequest) {
            MarkProductAsBoughtRequest markProductAsBoughtRequest = (MarkProductAsBoughtRequest) request;
            stringifiedRequest =
                    markProductAsBoughtRequest.id()
                    + SEPARATOR
                    + markProductAsBoughtRequest.timestamp()
                    + SEPARATOR
                    + markProductAsBoughtRequest.type()
                    + SEPARATOR
                    + markProductAsBoughtRequest.listId()
                    + SEPARATOR
                    + markProductAsBoughtRequest.productId();
        }

        return stringifiedRequest;
    }

    public static WidgetRequest fromString(String stringifiedRequest) {
        if (stringifiedRequest.isEmpty()) {
            return new EmptyRequest();
        }

        String[] requestDataArray = stringifiedRequest.split(SEPARATOR);
        if (requestDataArray.length < 3) {
            return new EmptyRequest();
        }

        String requestId = requestDataArray[ID_FIELD_INDEX];
        String requestType = requestDataArray[TYPE_FIELD_INDEX];
        String requestTimestamp = requestDataArray[TIMESTAMP_FIELD_INDEX];

        if (requestType.equalsIgnoreCase(WidgetRequestTypes.OPEN_SHOPPING_LIST_REQUEST)) {
            if (requestDataArray.length < 4) {
                return new EmptyRequest();
            }

            String listId = requestDataArray[LIST_ID_FIELD_INDEX];

            return new OpenShoppingListRequest(requestId, requestType, requestTimestamp, listId);
        } else if (requestType.equalsIgnoreCase(WidgetRequestTypes.MARK_PRODUCT_AS_BOUGHT_REQUEST)) {
            if (requestDataArray.length < 5) {
                return new EmptyRequest();
            }

            String listId = requestDataArray[LIST_ID_FIELD_INDEX];
            String productId = requestDataArray[PRODUCT_ID_FIELD_INDEX];

            return new MarkProductAsBoughtRequest(requestId, requestType, requestTimestamp, listId, productId);
        }

        return new EmptyRequest();
    }

    public static WritableMap toJsObject(WidgetRequest request) {
        WritableMap jsObjectMap = new WritableNativeMap();

        if (request instanceof OpenShoppingListRequest) {
            OpenShoppingListRequest openShoppingListRequest = (OpenShoppingListRequest) request;
            String id = openShoppingListRequest.id();
            String type = openShoppingListRequest.type();
            String timestamp = openShoppingListRequest.timestamp();
            String listId = openShoppingListRequest.listId();

            jsObjectMap.putString(WidgetRequestFields.ID, id);
            jsObjectMap.putString(WidgetRequestFields.TYPE, type);
            jsObjectMap.putString(WidgetRequestFields.TIMESTAMP, timestamp);
            jsObjectMap.putString(WidgetRequestFields.LIST_ID, listId);
        } else if (request instanceof MarkProductAsBoughtRequest) {
            MarkProductAsBoughtRequest markProductAsBoughtRequest = (MarkProductAsBoughtRequest) request;
            String id = markProductAsBoughtRequest.id();
            String type = markProductAsBoughtRequest.type();
            String timestamp = markProductAsBoughtRequest.timestamp();
            String listId = markProductAsBoughtRequest.listId();
            String productId = markProductAsBoughtRequest.productId();

            jsObjectMap.putString(WidgetRequestFields.ID, id);
            jsObjectMap.putString(WidgetRequestFields.TYPE, type);
            jsObjectMap.putString(WidgetRequestFields.TIMESTAMP, timestamp);
            jsObjectMap.putString(WidgetRequestFields.LIST_ID, listId);
            jsObjectMap.putString(WidgetRequestFields.PRODUCT_ID, productId);
        }

        return jsObjectMap;
    }
}
