package com.tobuybeta.modules.app_widget.storage.events.payloads;

import android.content.Context;

/**
 * TODO: Add a class header comment
 */

public class WidgetActiveChangedEventPayload {
    private Context mContext;
    private boolean mIsActive;

    public WidgetActiveChangedEventPayload(Context context, boolean isActive) {
        mContext = context;
        mIsActive = isActive;
    }

    public Context context() {
        return mContext;
    }

    public boolean isActive() {
        return mIsActive;
    }
}
