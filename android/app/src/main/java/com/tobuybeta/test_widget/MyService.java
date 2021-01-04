package com.tobuybeta.test_widget;

import android.content.Intent;
import android.widget.RemoteViewsService;

/**
 * TODO: Add a class header comment
 */

public class MyService extends RemoteViewsService {
    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {
        return new MyFactory(getApplicationContext(), intent);
    }
}
