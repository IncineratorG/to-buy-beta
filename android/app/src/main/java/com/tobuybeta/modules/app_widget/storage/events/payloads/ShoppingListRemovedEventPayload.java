package com.tobuybeta.modules.app_widget.storage.events.payloads;

import android.content.Context;

/**
 * TODO: Add a class header comment
 */

public class ShoppingListRemovedEventPayload {
    private Context mContext;
    private String mListId;

    public ShoppingListRemovedEventPayload(Context context, String listId) {
        mContext = context;
        mListId = listId;
    }

    public Context context() {
        return mContext;
    }

    public String listId() {
        return mListId;
    }
}
