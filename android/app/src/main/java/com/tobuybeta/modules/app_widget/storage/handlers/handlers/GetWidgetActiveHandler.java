package com.tobuybeta.modules.app_widget.storage.handlers.handlers;

import android.content.Context;
import android.content.SharedPreferences;

import com.tobuybeta.modules.app_widget.common.handler.Handler;
import com.tobuybeta.modules.app_widget.storage.constants.StorageConstants;

public class GetWidgetActiveHandler implements Handler {
    private Context mContext;

    public GetWidgetActiveHandler(Context context) {
        mContext = context;
    }

    @Override
    public Object handle() {
        SharedPreferences sharedPreferences = mContext
                .getSharedPreferences(StorageConstants.PREFERENCES_DATA_FIELD, Context.MODE_PRIVATE);

        return sharedPreferences.getBoolean(StorageConstants.PREFERENCES_WIDGET_ACTIVE_FIELD, false);
    }
}
