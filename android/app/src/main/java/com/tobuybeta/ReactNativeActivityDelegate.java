package com.tobuybeta;

import android.app.Activity;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class ReactNativeActivityDelegate extends ReactActivityDelegate {
    private Bundle initialProps = null;
    private Activity activity;

    public ReactNativeActivityDelegate(ReactActivity activity, @Nullable String mainComponentName) {
        super(activity, mainComponentName);
        this.activity = activity;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        if(activity != null) {
            Bundle bundle = activity.getIntent().getExtras();
            if(bundle != null) {
                bundle.putString("T", "1");
                initialProps = bundle;
            }
        }
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    protected Bundle getLaunchOptions() {
        return initialProps;
    }
}
