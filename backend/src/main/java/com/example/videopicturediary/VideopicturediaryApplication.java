package com.example.videopicturediary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VideopicturediaryApplication {

	public static void main(String[] args) {
		SpringApplication.run(VideopicturediaryApplication.class, args);
	}

}
/*
 * It's best practice to place configuration classes like CorsConfig in their own file
 * within the same package (e.g., com.videopicturediary).
 * Create a new file named CorsConfig.java in src/main/java/com/videopicturediary/
 * and put your configuration code there.
 */