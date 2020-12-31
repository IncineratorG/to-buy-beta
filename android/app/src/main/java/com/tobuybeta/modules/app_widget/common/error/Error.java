package com.tobuybeta.modules.app_widget.common.error;

/**
 * TODO: Add a class header comment
 */

public class Error {
    private String mCode;
    private String mMessage;

    public Error(String code, String message) {
        mCode = code;
        mMessage = message;
    }

    public String code() {
        return mCode;
    }

    public String message() {
        return mMessage;
    }
}
