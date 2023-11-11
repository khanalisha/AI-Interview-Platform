package com.InterviewMentor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.InterviewMentor.model.ChatNBXRequest;
import com.InterviewMentor.model.ChatNBXResponse;


@RestController
@RequestMapping
public class OpenAIController {
	
	@Value("${model}")
	private String model;
	
	@Value("${url}")
	private String apiURL;
	
	@Autowired
	private RestTemplate template;
	
	
	@GetMapping("/chat")
	public String chat(@RequestParam("prompt")  String prompt) {
		 ChatNBXRequest request= new ChatNBXRequest(model, prompt);
		
		 ChatNBXResponse	response= template.postForObject(apiURL, request, ChatNBXResponse.class);
	
	return response.getChoices().get(0).getMessage().getContent();
		 
		 
	}

}