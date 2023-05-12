package com.sneakersite.sneaker.app.controllers

import com.sneakersite.sneaker.app.models.Role
import com.sneakersite.sneaker.app.models.User
import com.sneakersite.sneaker.app.security.JwtUtil
import com.sneakersite.sneaker.app.services.UserService
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/api/users")
class UserController(
        private val userService: UserService,
        private val jwtUtil: JwtUtil
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
                val loginResponse = LoginResponse(user.id, user.email, user.roles)
                ResponseEntity.ok(loginResponse)
            } else {
                ResponseEntity.badRequest().build()
            }
        }
        return ResponseEntity.badRequest().build()
    }

}

data class LoginResponse(
        val id: Long,
        val email: String,
        val roles: Set<Role>
)
