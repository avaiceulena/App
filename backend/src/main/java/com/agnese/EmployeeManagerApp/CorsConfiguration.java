package com.agnese.EmployeeManagerApp;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer{
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/employee/**")  // Adjust the mapping as per your API endpoints
                .allowedOrigins("http://localhost:4200") // Allow requests from Angular application's origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow specified methods
                .allowedHeaders("*"); // Allow all headers
    }
}
