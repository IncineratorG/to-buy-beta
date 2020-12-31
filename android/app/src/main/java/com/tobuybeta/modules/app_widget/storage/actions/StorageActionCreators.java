package com.tobuybeta.modules.app_widget.storage.actions;

import android.content.Context;

import com.tobuybeta.modules.app_widget.common.action.Action;
import com.tobuybeta.modules.app_widget.common.action.ActionPayload;
import com.tobuybeta.modules.app_widget.common.action.ActionResult;

/**
 * TODO: Add a class header comment
 */

public class StorageActionCreators {
    public static Action setWidgetActiveAction(Context context, boolean isActive) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);
        payload.set("isActive", isActive);

        return new Action(StorageActionTypes.SET_WIDGET_ACTIVE, payload);
    }

    public static Action getWidgetActiveAction(Context context) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);

        return new Action(StorageActionTypes.GET_WIDGET_ACTIVE, payload);
    }
}
