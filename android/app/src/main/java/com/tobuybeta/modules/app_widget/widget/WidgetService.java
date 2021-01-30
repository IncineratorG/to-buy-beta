package com.tobuybeta.modules.app_widget.widget;

import android.content.Intent;
import android.widget.RemoteViewsService;

/**
 * TODO: Add a class header comment
 */

public class WidgetService extends RemoteViewsService {
    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {
        return new WidgetFactory(getApplicationContext(), intent);
    }
}
