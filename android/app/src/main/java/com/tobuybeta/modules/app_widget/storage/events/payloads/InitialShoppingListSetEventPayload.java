package com.tobuybeta.modules.app_widget.storage.events.payloads;

import android.content.Context;

import java.util.List;

public class InitialShoppingListSetEventPayload {
    private Context mContext;
    private List<String> mListIds;

    public InitialShoppingListSetEventPayload(Context context, List<String> listIds) {
        mContext = context;
        mListIds = listIds;
    }

    public Context context() {
        return mContext;
    }

    public List<String> listIds() {
        return mListIds;
    }
}
