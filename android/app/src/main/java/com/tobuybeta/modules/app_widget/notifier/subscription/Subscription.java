package com.tobuybeta.modules.app_widget.notifier.subscription;

import com.tobuybeta.modules.app_widget.notifier.event_handler.EventHandler;

public class Subscription {
    private int mId;
    private String mEvent;
    private EventHandler mEventHandler;

    public Subscription(int id, String eventType, EventHandler eventHandler) {
        this.mId = id;
        mEvent = eventType;
        mEventHandler = eventHandler;
    }

    public int getId() {
        return mId;
    }

    public String getEventType() {
        return mEvent;
    }

    public void handleEvent(Object data) {
        if (mEventHandler != null) {
            mEventHandler.handle(data);
        }
    }
}
