package com.tobuybeta.modules.app_widget.common.action;

import java.util.UUID;

/**
 * TODO: Add a class header comment
 */

public class Action {
    private UUID mUuid;
    private String mType;
    private ActionPayload mPayload;
    private ActionResult mResult;

    public Action(String type) {
        mType = type;
        mPayload = null;
        mResult = null;
        mUuid = UUID.randomUUID();
    }

//    public Action(String type, ActionResult result) {
//        mType = type;
//        mPayload = null;
//        mResult = result;
//        mUuid = UUID.randomUUID();
//    }

    public Action(String type, ActionPayload payload, ActionResult result) {
        mType = type;
        mPayload = payload;
        mResult = result;
        mUuid = UUID.randomUUID();
    }

    public String type() {
        return mType;
    }

    public ActionPayload payload() {
        return mPayload;
    }

    public ActionResult result() {
        return mResult;
    }

    public void complete(Object result) {
        mResult.set(result);
    }
}
