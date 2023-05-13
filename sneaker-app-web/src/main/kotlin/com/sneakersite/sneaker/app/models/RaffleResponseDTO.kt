package com.sneakersite.sneaker.app.models

import java.time.LocalDateTime

data class RaffleResponseDTO (
    val id: Long ,
    val sneaker: Sneaker?,
    val name: String,
    val region: String ,
    val type: String,
    val entryMethod: String,
    val startDate: LocalDateTime,
    val endDate: LocalDateTime,
    val isShipped: Boolean,
    val url: String,
    val entered: Boolean = false

)