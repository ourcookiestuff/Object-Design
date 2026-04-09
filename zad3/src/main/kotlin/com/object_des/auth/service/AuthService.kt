package com.object_des.auth.service

class AuthService(private val type: String) {
    // mock hasła
    private val passwords = mapOf(
        "john_doe" to "password123",
        "jane_doe" to "password456"
    )

    fun authenticate(username: String, password: String): Boolean {
        println("Authenticating user: $username")
        val validPassword = passwords[username]
        return validPassword != null && validPassword == password
    }
}