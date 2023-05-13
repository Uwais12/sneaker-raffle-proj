package com.sneakersite.sneaker.app.controllers

import com.sneakersite.sneaker.app.models.*
import com.sneakersite.sneaker.app.repositories.UserRepository
import com.sneakersite.sneaker.app.security.JwtUtil
import com.sneakersite.sneaker.app.services.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import javax.persistence.EntityNotFoundException
import javax.servlet.http.HttpServletRequest


@RestController
@RequestMapping("/api/users")
class UserController(
        private val userService: UserService,
        private val jwtUtil: JwtUtil,
) {

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or @userService.canAccessUser(authentication, #id)")
    fun getUser(@PathVariable id: Long): ResponseEntity<User> {
        val user = userService.findById(id)
        return if (user != null) {
            ResponseEntity.ok(user)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/me")
    fun getCurrentUser(request: HttpServletRequest): ResponseEntity<LoginResponse> {
        val authorizationHeader = request.getHeader("Authorization")
        val jwtToken = authorizationHeader?.substring(7)
        if (jwtToken != null) {
            val email = jwtUtil.getUsernameFromToken(jwtToken)
            val user = userService.findByEmail(email)
            return if (user != null) {
                val loginResponse = LoginResponse(user.id, user.email, user.rafflesEntered, user.roles)
                ResponseEntity.ok(loginResponse)
            } else {
                ResponseEntity.badRequest().build()
            }
        }
        return ResponseEntity.badRequest().build()
    }

    @PostMapping("/{userId}/raffles/{raffleId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or @userService.canAccessUser(authentication, #userId)")
    fun enterRaffle(@PathVariable userId: Long, @PathVariable raffleId: Long): ResponseEntity<String> {
        return try {
            val user = userService.enterRaffle(userId, raffleId)
            ResponseEntity.ok("Raffle entered successfully!")
        } catch (e: EntityNotFoundException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)
        }
    }

    @GetMapping("/{userId}/raffles")
    @PreAuthorize("hasRole('ROLE_ADMIN') or @userService.canAccessUser(authentication, #userId)")
    fun getRafflesEnteredByUser(@PathVariable userId: Long): ResponseEntity<Set<Raffle>> {
        return try {
            val raffles = userService.getRafflesEnteredByUser(userId)
            ResponseEntity.ok(raffles)
        } catch (e: EntityNotFoundException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)
        }
    }




}
data class LoginResponse(
        val id: Long,
        val email: String,
        val enteredRaffles: MutableSet<Raffle>,
        val roles: Set<Role>
)

