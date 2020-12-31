package com.tobuybeta.modules.app_widget.storage.handlers.handlers;

import android.content.Context;
import android.content.SharedPreferences;

import com.tobuybeta.modules.app_widget.common.handler.Handler;
import com.tobuybeta.modules.app_widget.storage.constants.StorageConstants;

/**
 * TODO: Add a class header comment
 */

public class SetWidgetActiveHandler implements Handler {
    private Context mContext;
    private boolean mIsActive;

    public SetWidgetActiveHandler(Context context, boolean isActive) {
        mContext = context;
        mIsActive = isActive;
    }

    @Override
    public Object handle() {
        if (mContext == null) {
            return false;
        }

        SharedPreferences.Editor editor = mContext.
                getSharedPreferences(StorageConstants.PREFERENCES_DATA_FIELD, Context.MODE_PRIVATE).
                edit();

        editor.putBoolean(StorageConstants.PREFERENCES_WIDGET_ACTIVE_FIELD, mIsActive);

        editor.commit();

        return true;
    }
}
