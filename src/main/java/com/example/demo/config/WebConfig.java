package com.example.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${file.storage.location}")
    private String fileStorageLocation;


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve all static files directly from the "static" folder
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");

        // Serve image files from the external directory
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:" + fileStorageLocation);
        fileStorageLocation = fileStorageLocation.endsWith("/") ? fileStorageLocation : fileStorageLocation + "/";
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
    }


}
