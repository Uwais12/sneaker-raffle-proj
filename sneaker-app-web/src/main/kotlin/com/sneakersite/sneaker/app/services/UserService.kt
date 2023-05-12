package com.sneakersite.sneaker.app.services

import com.sneakersite.sneaker.app.models.User
import com.sneakersite.sneaker.app.repositories.UserRepository
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class UserService(private val userRepository: UserRepository) {
    fun findByEmail(email: String): User? {
        return userRepository.findByEmail(email)
    }

    fun save(user: User): User {
        return userRepository.save(user)
    }

    fun findById(id: Long): User? {
        return userRepository.findById(id).orElse(null)
    }

    @Transactional
    fun canAccessUser(authentication: Authentication, userId: Long): Boolean {
        val user = userRepository.findByEmail(authentication.name)
        return user?.id == userId || user?.roles?.any { it.name == "ROLE_ADMIN" } == true
    }
}
