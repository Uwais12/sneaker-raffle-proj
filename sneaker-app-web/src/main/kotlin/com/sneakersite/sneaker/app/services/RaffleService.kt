package com.sneakersite.sneaker.app.services

import com.sneakersite.sneaker.app.models.Raffle
import com.sneakersite.sneaker.app.models.RaffleDTO
import com.sneakersite.sneaker.app.repositories.RaffleRepository
import com.sneakersite.sneaker.app.repositories.SneakerRepository
import org.springframework.stereotype.Service
import javax.persistence.EntityNotFoundException

@Service
class RaffleService(private val raffleRepository: RaffleRepository, private val sneakerRepository: SneakerRepository) {
    fun getAllRaffles(): List<Raffle> = raffleRepository.findAll()
    fun getRaffleById(id: Long): Raffle=raffleRepository.getById(id)
    fun getRafflesBySneakerId(sneakerId: Long): List<Raffle> {
        return raffleRepository.findBySneakerId(sneakerId)
    }
    fun createRaffle(raffleDTO: RaffleDTO): Raffle {
        val sneaker = sneakerRepository.findById(raffleDTO.sneakerId).orElseThrow {
            EntityNotFoundException("Sneaker with id ${raffleDTO.sneakerId} not found")
        }
        val raffle = Raffle(
                sneaker = sneaker,
                name = raffleDTO.name,
                region = raffleDTO.region,
                type = raffleDTO.type,
                entryMethod = raffleDTO.entryMethod,
                startDate = raffleDTO.startDate,
                endDate = raffleDTO.endDate,
                isShipped = raffleDTO.isShipped,
                url = raffleDTO.url
        )
        return raffleRepository.save(raffle)
    }

    fun deleteRaffle(id: Long): Boolean {
        if (raffleRepository.existsById(id)) {
            raffleRepository.deleteById(id)
            return true
        }
        return false
    }



}
