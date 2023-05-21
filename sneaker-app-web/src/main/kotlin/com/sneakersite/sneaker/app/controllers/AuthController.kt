package com.sneakersite.sneaker.app.controllers
import com.sneakersite.sneaker.app.models.Role
import com.sneakersite.sneaker.app.models.User
import com.sneakersite.sneaker.app.security.CustomUserDetailsService
import com.sneakersite.sneaker.app.services.RoleService
import com.sneakersite.sneaker.app.services.UserService
import com.sneakersite.sneaker.app.security.JwtUtil
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
        private val jwtUtil: JwtUtil,
        private val authenticationManager: AuthenticationManager,
        private val userService: UserService,
        private val roleService: RoleService,
        private val passwordEncoder: BCryptPasswordEncoder,
        private val customUserDetailsService: CustomUserDetailsService
) {

    @PostMapping("/register")
    fun register(@RequestBody request: RegistrationRequest): ResponseEntity<RegistrationResponse> {
        if (userService.findByEmail(request.email) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build()
        }

        val userRole = roleService.findByName("ROLE_USER") ?: roleService.save(Role(name = "ROLE_USER"))

        val newUser = User(
                email = request.email,
                password = passwordEncoder.encode(request.password),
                roles = setOf(userRole)
        )

        val savedUser = userService.save(newUser)
        val response = RegistrationResponse(
                id = savedUser.id,
                email = savedUser.email,
                roles = savedUser.roles
        )

        return ResponseEntity.status(HttpStatus.CREATED).body(response)
    }

    @PostMapping("/login")
    fun authenticateUser(@RequestBody loginRequest: LoginRequest): ResponseEntity<AuthenticationResponse> {
        val authentication: Authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                        loginRequest.email,
                        loginRequest.password
                )
        )

        SecurityContextHolder.getContext().authentication = authentication

        val user: UserDetails = customUserDetailsService.loadUserByUsername(loginRequest.email)
        val jwt: String = jwtUtil.generateToken(authentication.principal as UserDetails)
        val userResp: UserDTO = UserDTO(user.username, user.authorities.map { it.authority })
        val response = AuthenticationResponse(jwt, userResp)
        return ResponseEntity.ok(response)
    }

    @PostMapping("/logout")
    fun logout(): ResponseEntity<Void> {
        SecurityContextHolder.clearContext()
        return ResponseEntity.ok().build()
    }
}

data class RegistrationRequest(val email: String, val password: String)
data class LoginRequest(val email: String, val password: String)
data class AuthenticationResponse(val token: String, val user: UserDTO)

data class RegistrationResponse(
        val id: Long,
        val email: String,
        val roles: Set<Role>
)

data class UserDTO(
        val email: String,
        val roles: List<String>
)