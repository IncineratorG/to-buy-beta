package com.tobuybeta.modules.phonemessaging.module_actions.payloads;

import com.facebook.react.bridge.ReadableMap;
import com.tobuybeta.modules.phonemessaging.module_actions.payloads.payloads.SendSmsMessagePayload;
import com.tobuybeta.modules.phonemessaging.module_actions.payloads.payloads.SendTelegramMessagePayload;
import com.tobuybeta.modules.phonemessaging.module_actions.payloads.payloads.SendWhatsAppMessagePayload;

public class PhoneMessagingJSActionPayloads {
    public static SendSmsMessagePayload sendSmsMessagePayload(ReadableMap payloadMap) {
        return new SendSmsMessagePayload(payloadMap);
    }

    public static SendWhatsAppMessagePayload sendWhatsAppMessagePayload(ReadableMap payloadMap) {
        return new SendWhatsAppMessagePayload(payloadMap);
    }

    public static SendTelegramMessagePayload sendTelegramMessagePayload(ReadableMap payloadMap) {
        return new SendTelegramMessagePayload(payloadMap);
    }
}
