package com.object_des.auth.controller

import com.object_des.auth.model.UserResponse
import com.object_des.auth.model.LoginRequest
import com.object_des.auth.service.AuthService
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController( @Qualifier("authService") private val authService: AuthService ) {
    @GetMapping("/user")
    fun getUser() = listOf(
        UserResponse(1, "john_doe", "john.doe@example.com"),
        UserResponse(2, "jane_doe", "jane.doe@example.com"),
    )

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): String {
        return if (authService.authenticate(request.username, request.password)) {
            "Login successful"
        } else {
            "Invalid credentials"
        }
    }

}