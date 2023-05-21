package com.sneakersite.sneaker.app.repositories

import com.sneakersite.sneaker.app.models.Raffle
import com.sneakersite.sneaker.app.models.Sneaker
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface RaffleRepository : JpaRepository<Raffle, Long> {
    fun findBySneakerId(sneakerId: Long): List<Raffle>

    @Query("SELECT r.sneaker.id, COUNT(r) FROM Raffle r GROUP BY r.sneaker.id")
    fun countRafflesBySneaker(): List<Array<Any>>

    @Query("SELECT r.sneaker FROM Raffle r WHERE r.endDate > CURRENT_DATE GROUP BY r.sneaker")
    fun findSneakersWithUpcomingRaffles(): List<Sneaker>


}