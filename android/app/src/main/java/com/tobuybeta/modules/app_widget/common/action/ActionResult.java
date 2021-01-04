package com.tobuybeta.modules.app_widget.common.action;

/**
 * TODO: Add a class header comment
 */

public class ActionResult {
    private Object mValue;

    public ActionResult() {

    }

    public ActionResult(Object value) {
        mValue = value;
    }

    public void set(Object value) {
        mValue = value;
    }

    public Object get() {
        return mValue;
    }
}
