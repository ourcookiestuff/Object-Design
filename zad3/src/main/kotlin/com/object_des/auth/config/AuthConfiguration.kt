package com.object_des.auth.config

import com.object_des.auth.service.AuthService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Lazy
import org.springframework.context.annotation.Configuration

@Configuration
class AuthConfiguration {
    @Bean
    fun authService(): AuthService {
        println("Initializing AuthService - EAGER")
        return AuthService("EAGER")
    }

    @Bean
    @Lazy
    fun lazyAuthService(): AuthService {
        println("Initializing AuthService - LAZY")
        return AuthService("LAZY")
    }
}