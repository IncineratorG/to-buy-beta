package com.tobuybeta.modules.app_widget.common.action;

import java.util.UUID;

public class Action {
    private UUID mUuid;
    private String mType;
    private ActionPayload mPayload;
    private ActionResult mResult;

    public Action(String type) {
        mType = type;
        mPayload = null;
        mResult = new ActionResult();
        mUuid = UUID.randomUUID();
    }

    public Action(String type, ActionPayload payload) {
        mType = type;
        mPayload = payload;
        mResult = new ActionResult();
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
