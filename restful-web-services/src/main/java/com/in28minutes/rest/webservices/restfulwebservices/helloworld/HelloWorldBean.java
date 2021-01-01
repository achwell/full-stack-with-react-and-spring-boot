package com.in28minutes.rest.webservices.restfulwebservices.helloworld;

import java.util.StringJoiner;

public class HelloWorldBean {

    private String message;

    public HelloWorldBean(String message) {
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
        return new StringJoiner(", ", HelloWorldBean.class.getSimpleName() + "[", "]")
                .add("message='" + message + "'")
                .toString();
    }

}