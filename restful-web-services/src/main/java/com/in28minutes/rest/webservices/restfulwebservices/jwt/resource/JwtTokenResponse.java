package com.in28minutes.rest.webservices.restfulwebservices.jwt.resource;

import java.io.Serializable;

public class JwtTokenResponse implements Serializable {

    private final String token;

    public JwtTokenResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}