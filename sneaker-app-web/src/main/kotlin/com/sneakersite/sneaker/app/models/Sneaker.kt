package com.sneakersite.sneaker.app.models

import java.math.BigDecimal
import java.time.LocalDate
import java.time.LocalDateTime
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class Sneaker(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long=0,
        val name: String="",
        val brand: String="",
        val releaseDate: LocalDate=LocalDate.now(),
        val imageUrl: String="",
//        val price: BigDecimal = BigDecimal.ZERO
//        val productCode: String="",
//        val thumbsUpCount: Int=0,
//        val thumbsDownCount: Int=0,
        )
