package com.sneakersite.sneaker.app.services

import com.sneakersite.sneaker.app.models.Sneaker
import com.sneakersite.sneaker.app.repositories.RaffleRepository
import com.sneakersite.sneaker.app.repositories.SneakerRepository
import org.springframework.stereotype.Service

@Service
class SneakerService(private val sneakerRepository: SneakerRepository, private val raffleRepository: RaffleRepository) {
    fun getAllSneakers(): List<Sneaker> = sneakerRepository.findAll()
    fun getSneakerById(id: Long): Sneaker=sneakerRepository.getById(id)
    fun createSneaker(sneaker: Sneaker): Sneaker {
        return sneakerRepository.save(sneaker)
    }
    fun deleteSneaker(id: Long): Boolean {
        if (sneakerRepository.existsById(id)) {
            sneakerRepository.deleteById(id)
            return true
        }
        return false
    }

    fun getSneakerRaffleCounts(): Map<Long, Int> {
        return raffleRepository.countRafflesBySneaker()
                .associate { it[0] as Long to (it[1] as Long).toInt() }
    }



}
