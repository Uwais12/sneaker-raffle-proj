package com.sneakersite.sneaker.app.repositories

import com.sneakersite.sneaker.app.models.Sneaker
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface SneakerRepository : JpaRepository<Sneaker, Long> {
    @Query("SELECT s FROM Sneaker s JOIN Raffle r ON r.sneaker.id = s.id WHERE r.endDate > CURRENT_DATE GROUP BY s.id, s.brand, s.imageUrl, s.name, s.price, s.productCode, s.releaseDate, s.thumbsDownCount, s.thumbsUpCount")
    fun findAllWithActiveRaffles(): List<Sneaker>

}
