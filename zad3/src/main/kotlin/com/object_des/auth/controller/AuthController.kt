package com.object_des.auth.controller

import com.object_des.auth.model.UserResponse
import com.object_des.auth.service.AuthService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class AuthController(private val eagerAuthService: AuthService) {
    @GetMapping("/user")
    fun getUser() = listOf(
        UserResponse(1, "john_doe", "john.doe@example.com"),
        UserResponse(2, "jane_doe", "jane.doe@example.com"),
    )
}