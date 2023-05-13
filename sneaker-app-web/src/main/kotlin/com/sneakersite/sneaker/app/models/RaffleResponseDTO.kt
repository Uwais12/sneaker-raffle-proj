package com.sneakersite.sneaker.app.models

import java.time.LocalDateTime
import javax.persistence.*

data class RaffleWithEntered (
    val id: Long ,
    val sneaker: Sneaker?,
    val name: String,
    val region: String ,
    val type: String,
    val entryMethod: String,
    val startDate: LocalDateTime,
    val endDate: LocalDateTime,
    val isShipped: Boolean,
    val url: String

)