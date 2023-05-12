package com.sneakersite.sneaker.app.repositories

import com.sneakersite.sneaker.app.models.Raffle
import org.springframework.data.jpa.repository.JpaRepository

interface RaffleRepository : JpaRepository<Raffle, Long> {
    fun findBySneakerId(sneakerId: Long): List<Raffle>
}