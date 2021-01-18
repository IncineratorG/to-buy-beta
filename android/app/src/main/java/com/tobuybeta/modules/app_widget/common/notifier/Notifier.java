package com.tobuybeta.modules.app_widget.common.notifier;

import com.tobuybeta.modules.app_widget.common.notifier.event_handler.EventHandler;
import com.tobuybeta.modules.app_widget.common.notifier.subscription.Subscription;
import com.tobuybeta.modules.app_widget.common.notifier.unsubscribe_handler.UnsubscribeHandler;

import java.util.ArrayList;
import java.util.List;

public class Notifier {
    private int mIdsGenerator;
    private List<Subscription> mSubscriptions;

    public Notifier() {
        mSubscriptions = new ArrayList<>();
    }

    public UnsubscribeHandler subscribe(String eventType, EventHandler handler) {
        int id = ++mIdsGenerator;

        UnsubscribeHandler unsubscribeHandler = () -> {
            for (int i = 0; i < mSubscriptions.size(); ++i) {
                if (mSubscriptions.get(i).getId() == id) {
                    mSubscriptions.remove(i);
                    break;
                }
            }
        };

        Subscription s = new Subscription(id, eventType, handler);
        mSubscriptions.add(s);

        return unsubscribeHandler;
    }

    public void notify(String eventType, Object data) {
        for (Subscription s : mSubscriptions) {
            if (s != null && s.getEventType().equals(eventType)) {
                s.handleEvent(data);
            }
        }
    }
}
