package com.tobuybeta.modules.app_widget.module_actions.payloads.payloads;

import com.facebook.react.bridge.ReadableMap;
import com.tobuybeta.modules.modules_common.js_payload.JSPayload;

public class RemoveShoppingListPayload implements JSPayload {
    private String LIST_ID_FIELD = "listId";
    private boolean mIsValid;
    private String mListId;

    public RemoveShoppingListPayload(ReadableMap payloadMap) {
        mListId = String.valueOf(payloadMap.getInt(LIST_ID_FIELD));
        mIsValid = !mListId.isEmpty();
    }

    @Override
    public boolean isValid() {
        return mIsValid;
    }

    public String listId() {
        return mListId;
    }
}
