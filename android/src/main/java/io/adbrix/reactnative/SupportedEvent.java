package io.adbrix.reactnative;

public enum SupportedEvent {
    DEEPLINK("dfn_deeplink_listener"),
    IAMCLICK("dfn_inappmessage_click_listener");

    private final String value;

    SupportedEvent(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
