package com.sneakersite.sneaker.app.repositories

import com.sneakersite.sneaker.app.models.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): User?

}

