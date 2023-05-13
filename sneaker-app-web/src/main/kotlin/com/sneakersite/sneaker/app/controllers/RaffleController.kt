package com.sneakersite.sneaker.app.controllers

import com.sneakersite.sneaker.app.models.*
import com.sneakersite.sneaker.app.security.JwtUtil
import com.sneakersite.sneaker.app.services.RaffleService
import com.sneakersite.sneaker.app.services.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/api/raffles")
class RaffleController(
        private val raffleService: RaffleService,
        private val jwtUtil: JwtUtil,
        private val userService: UserService,

        ) {

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

//    @GetMapping("/sneaker/{sneakerId}")
//    fun getRafflesBySneakerId(@PathVariable sneakerId: Long): ResponseEntity<List<Raffle>> {
//        val raffles = raffleService.getRafflesBySneakerId(sneakerId)
//        return ResponseEntity.ok(raffles)
//    }

    @GetMapping("/sneaker/{sneakerId}")
    fun getRafflesBySneakerId(@PathVariable sneakerId: Long, request: HttpServletRequest): ResponseEntity<List<RaffleResponseDTO>> {
        val raffles = raffleService.getRafflesBySneakerId(sneakerId)
        val jwtToken = request.getHeader("Authorization")?.substring(7)
        val user = jwtToken?.let { token -> userService.findByEmail(jwtUtil.getUsernameFromToken(token)) }
        val raffleDTOList = raffles.map { raffle ->
            val entered = user?.rafflesEntered?.contains(raffle) ?: false
            RaffleResponseDTO(raffle.id, raffle.sneaker, raffle.name, raffle.region, raffle.type, raffle.entryMethod, raffle.startDate, raffle.endDate, raffle.isShipped, raffle.url, entered)
        }
        return ResponseEntity.ok(raffleDTOList)
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



