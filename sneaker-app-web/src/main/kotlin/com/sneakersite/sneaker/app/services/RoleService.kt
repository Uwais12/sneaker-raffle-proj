package com.sneakersite.sneaker.app.services

import com.sneakersite.sneaker.app.models.Role
import com.sneakersite.sneaker.app.repositories.RoleRepository
import org.springframework.stereotype.Service

@Service
class RoleService(private val roleRepository: RoleRepository) {
    fun findByName(name: String): Role? {
        return roleRepository.findByName(name)
    }

    fun save(role: Role): Role {
        return roleRepository.save(role)
    }
}
