package com.object_des.auth.config

import com.object_des.auth.service.AuthService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class AuthConfiguration {
    @Bean
    fun authService(): AuthService {
        println("Initializing AuthService with mock data")
        return AuthService("mock")
    }
}