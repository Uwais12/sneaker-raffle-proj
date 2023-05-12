package com.sneakersite.sneaker.app.repositories

import com.sneakersite.sneaker.app.models.Sneaker
import org.springframework.data.jpa.repository.JpaRepository

interface SneakerRepository : JpaRepository<Sneaker, Long>
