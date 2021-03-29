package com.tobuybeta.modules.phonemessaging.module_errors;

import com.tobuybeta.modules.modules_common.error.Error;

public class PhoneMessagingErrors {
    public static Error badAction() {
        return new Error("1", "BAD_ACTION");
    }

    public static Error badActionType() {
        return new Error("2", "BAD_ACTION_TYPE");
    }

    public static Error unknownActionType() {
        return new Error("3", "UNKNOWN_ACTION_TYPE");
    }

    public static Error badPayload() {
        return new Error("4", "BAD_PAYLOAD");
    }

    public static Error badCurrentActivity() {
        return new Error("5", "BAD_CURRENT_ACTIVITY");
    }

    public static Error unableToResolveActivity() {
        return new Error("6", "UNABLE_TO_RESOLVE_ACTIVITY");
    }
}
