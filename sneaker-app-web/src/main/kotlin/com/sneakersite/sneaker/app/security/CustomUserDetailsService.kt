package com.sneakersite.sneaker.app.security

import com.sneakersite.sneaker.app.services.UserService
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class CustomUserDetailsService(private val userService: UserService) : UserDetailsService {
    override fun loadUserByUsername(email: String): UserDetails {
        val user = userService.findByEmail(email)
            ?: throw UsernameNotFoundException("User not found with email: $email")
        return CustomUserDetails(user)
    }
}
