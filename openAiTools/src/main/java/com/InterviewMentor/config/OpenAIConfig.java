package com.InterviewMentor.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;


@Configuration
public class OpenAIConfig {

	
	@Value("${key}")
	String OpenApiKey;
	
	@Bean
	@Qualifier("openaiRestTemplate")
	public RestTemplate template() {
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getInterceptors().add((request,body,execution) -> {
			
			request.getHeaders().add("Authorization", "Bearer " + OpenApiKey);

			
			return execution.execute(request,body);
		});
		
		return restTemplate;
		
	}
	
	
}
