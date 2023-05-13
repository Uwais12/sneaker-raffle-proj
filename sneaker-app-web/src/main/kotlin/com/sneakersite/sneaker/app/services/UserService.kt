package com.sneakersite.sneaker.app.services

import com.sneakersite.sneaker.app.models.User
import com.sneakersite.sneaker.app.repositories.UserRepository
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service
import javax.persistence.EntityNotFoundException
import javax.transaction.Transactional
import com.sneakersite.sneaker.app.models.Raffle
import com.sneakersite.sneaker.app.repositories.RaffleRepository
import org.hibernate.Hibernate

@Service
class UserService(private val userRepository: UserRepository, private val raffleRepository: RaffleRepository) {
    fun findByEmail(email: String): User? {
        return userRepository.findByEmail(email)
    }

    fun save(user: User): User {
        return userRepository.save(user)
    }

    fun findById(id: Long): User {
        return userRepository.findById(id).orElseThrow {
            EntityNotFoundException("User with id $id not found")
        }
    }



    @Transactional
    fun canAccessUser(authentication: Authentication, userId: Long): Boolean {
        val user = userRepository.findByEmail(authentication.name)
        return user?.id == userId || user?.roles?.any { it.name == "ROLE_ADMIN" } == true
    }

    fun enterRaffle(userId: Long, raffleId: Long): User {
        val user = userRepository.findById(userId).orElseThrow {
            EntityNotFoundException("User with id $userId not found")
        }
        val raffle = raffleRepository.findById(raffleId).orElseThrow {
            EntityNotFoundException("Raffle with id $raffleId not found")
        }
        user.rafflesEntered.add(raffle)
        return userRepository.save(user)
    }

    fun getRafflesEnteredByUser(userId: Long): Set<Raffle> {
        return userRepository.findById(userId).map { user ->
            Hibernate.initialize(user.rafflesEntered)
            user.rafflesEntered
        }.orElseThrow {
            EntityNotFoundException("User with id $userId not found")
        }
    }
}
