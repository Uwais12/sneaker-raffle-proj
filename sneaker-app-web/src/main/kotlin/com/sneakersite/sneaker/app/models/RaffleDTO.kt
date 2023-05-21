package com.sneakersite.sneaker.app.models
import java.time.LocalDateTime

data class RaffleDTO(
        val sneakerId: Long,
        val name: String = "",
        val region: String = "",
        val entryMethod: String = "",
        val startDate: LocalDateTime = LocalDateTime.now(),
        val endDate: LocalDateTime = LocalDateTime.now(),
        val isShipped: Boolean = false,
        val url: String = ""
)