package com.sneakersite.sneaker.app.controllers

import com.sneakersite.sneaker.app.models.Raffle
import com.sneakersite.sneaker.app.models.RaffleDTO
import com.sneakersite.sneaker.app.services.RaffleService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/raffles")
class RaffleController(private val raffleService: RaffleService) {

    @GetMapping
    fun getAllRaffles(): ResponseEntity<List<Raffle>> {
        val raffles = raffleService.getAllRaffles()
        return ResponseEntity.ok(raffles)
    }

    @GetMapping("/{id}")
    fun getRaffleById(@PathVariable id: Long): ResponseEntity<Raffle> {
        val raffle = raffleService.getRaffleById(id)
        return if (raffle != null) {
            ResponseEntity.ok(raffle)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/sneaker/{sneakerId}")
    fun getRafflesBySneakerId(@PathVariable sneakerId: Long): ResponseEntity<List<Raffle>> {
        val raffles = raffleService.getRafflesBySneakerId(sneakerId)
        return ResponseEntity.ok(raffles)
    }

    @PostMapping
    fun createRaffle(@RequestBody raffleDTO: RaffleDTO): ResponseEntity<Raffle> {
        val newRaffle = raffleService.createRaffle(raffleDTO)
        return ResponseEntity.status(HttpStatus.CREATED).body(newRaffle)
    }

    @DeleteMapping("/{id}")
    fun deleteRaffle(@PathVariable id: Long): ResponseEntity<Void> {
        return if (raffleService.deleteRaffle(id)) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }



    // Add more endpoints as needed, such as for updating or deleting raffles
}

