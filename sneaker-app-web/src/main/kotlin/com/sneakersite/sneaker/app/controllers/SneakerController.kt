package com.sneakersite.sneaker.app.controllers

import com.sneakersite.sneaker.app.models.Sneaker
import com.sneakersite.sneaker.app.services.SneakerService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/sneakers")
class SneakerController(private val sneakerService: SneakerService) {

    @GetMapping
    fun getAllSneakers(): ResponseEntity<List<Sneaker>> {
        val sneakers = sneakerService.getAllSneakers()
        return ResponseEntity.ok(sneakers)
    }

    @GetMapping("/{id}")
    fun getSneakerById(@PathVariable id: Long): ResponseEntity<Sneaker> {
        val sneaker = sneakerService.getSneakerById(id)
        return if (sneaker != null) {
            ResponseEntity.ok(sneaker)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping
    fun createSneaker(@RequestBody sneaker: Sneaker): ResponseEntity<Sneaker> {
        val newSneaker = sneakerService.createSneaker(sneaker)
        return ResponseEntity.status(HttpStatus.CREATED).body(newSneaker)
    }

    @DeleteMapping("/{id}")
    fun deleteSneaker(@PathVariable id: Long): ResponseEntity<Void> {
        return if (sneakerService.deleteSneaker(id)) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/raffle-counts")
    fun getSneakerRaffleCounts(): ResponseEntity<Map<Long, Int>> {
        val raffleCounts = sneakerService.getSneakerRaffleCounts()
        return ResponseEntity.ok(raffleCounts)
    }

    // Add more endpoints as needed, such as for updating or deleting sneakers
}
