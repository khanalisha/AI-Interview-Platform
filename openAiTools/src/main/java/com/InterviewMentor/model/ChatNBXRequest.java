package com.InterviewMentor.model;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class ChatNBXRequest {
	
	private String model;
	private List<Message> messages;
	
	public ChatNBXRequest(String model, String prompt) {
	    super();
	    this.model = model;
	    this.messages = new ArrayList<>();
	    this.messages.add(new Message("user", prompt));
	}

}
