package com.in28minutes.basic.auth;

import java.util.StringJoiner;

public class AuthenticationBean {

    private String message;

    public AuthenticationBean(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", AuthenticationBean.class.getSimpleName() + "[", "]")
                .add("message='" + message + "'")
                .toString();
    }

}
