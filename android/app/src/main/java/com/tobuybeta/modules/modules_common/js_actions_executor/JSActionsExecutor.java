package com.tobuybeta.modules.modules_common.js_actions_executor;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;

public interface JSActionsExecutor {
    void execute(ReadableMap action, Promise result);
}
