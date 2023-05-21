package com.sneakersite.sneaker.app.models

import java.time.LocalDateTime
import javax.persistence.*

@Entity
data class Raffle(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sneaker_id")
    val sneaker: Sneaker? = null,
    val shopName: String = "",
    val region: String = "",
    val entryMethod: String = "",
    val startDate: LocalDateTime = LocalDateTime.now(),
    val endDate: LocalDateTime = LocalDateTime.now(),
    val isShipped: Boolean = false,
    val url: String = ""
)
