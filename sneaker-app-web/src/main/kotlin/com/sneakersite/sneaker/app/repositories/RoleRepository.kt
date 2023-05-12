package com.sneakersite.sneaker.app.repositories

import com.sneakersite.sneaker.app.models.Role
import org.springframework.data.jpa.repository.JpaRepository

interface RoleRepository : JpaRepository<Role, Long> {
    fun findByName(name: String): Role?
}
