package com.object_des.auth

import com.object_des.auth.service.AuthService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import jakarta.annotation.PostConstruct

@SpringBootApplication
class AuthApplication @Autowired constructor( @Qualifier("authService") private val authService: AuthService ) {
	@PostConstruct
	fun init() {
		println("AuthApplication started - testing AuthService:")
        println("john_doe/1234: ${authService.authenticate("john_doe", "password123")}")
        println("john_doe/wrong: ${authService.authenticate("john_doe", "wrong")}")
	}
}

fun main(args: Array<String>) {
	runApplication<AuthApplication>(*args)
}
