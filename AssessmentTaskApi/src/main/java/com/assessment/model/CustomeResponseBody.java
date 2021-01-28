package com.assessment.model;

import org.springframework.stereotype.Component;

@Component
public class CustomeResponseBody {

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getResponseCode() {
		return responseCode;
	}

	public void setResponseCode(int responseCode) {
		this.responseCode = responseCode;
	}

	private String message;
	private int responseCode;
}