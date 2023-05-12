
package com.sneakersite.sneaker.app

import com.sneakersite.sneaker.app.models.Raffle
import com.sneakersite.sneaker.app.models.Role
import com.sneakersite.sneaker.app.models.Sneaker
import com.sneakersite.sneaker.app.models.User
import com.sneakersite.sneaker.app.repositories.RaffleRepository
import com.sneakersite.sneaker.app.repositories.RoleRepository
import com.sneakersite.sneaker.app.repositories.SneakerRepository
import com.sneakersite.sneaker.app.repositories.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import java.time.LocalDate
import java.time.LocalDateTime

@Component
class DataLoader(
    private val sneakerRepository: SneakerRepository,
    private val raffleRepository: RaffleRepository,
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder, private val roleRepository: RoleRepository
) : CommandLineRunner {

    override fun run(vararg args: String?) {
        return
        // Create dummy sneakers
        val sneaker1 = Sneaker(
            id = 0L,
            name = "Air Jordan 1 Retro High OG",
            brand = "Nike",
            releaseDate = LocalDate.of(2023, 6, 1)
        )

        val sneaker2 = Sneaker(
            id = 1L,
            name = "Yeezy Boost 350 V2",
            brand = "Adidas",
            releaseDate = LocalDate.of(2023, 6, 15)
        )

        // Save sneakers to the database
        val savedSneaker1 = sneakerRepository.save(sneaker1)
        val savedSneaker2 = sneakerRepository.save(sneaker2)

        // Create dummy raffles
        val raffle1 = Raffle(
            id = 0L,
            sneaker = savedSneaker1,
            name = "Raffle 1",
            region = "US",
            type = "Online",
            entryMethod = "Email",
            startDate = LocalDateTime.of(2023, 5, 20, 0, 0),
            endDate = LocalDateTime.of(2023, 5, 25, 0, 0),
            isShipped = false,
            url = "https://example.com/raffle1"
        )

        val raffle2 = Raffle(
            id = 1L,
            sneaker = savedSneaker2,
            name = "Raffle 2",
            region = "UK",
            type = "In-store",
            entryMethod = "Purchase",
            startDate = LocalDateTime.of(2023, 5, 22, 0, 0),
            endDate = LocalDateTime.of(2023, 5, 24, 0, 0),
            isShipped = false,
            url = "https://example.com/raffle2"
        )

        val dummyRole = Role(
            id = 0L,
            name = "ROLE_USER",
            users = emptySet()
        )



        // Save raffles to the database
        val savedRole = roleRepository.save(dummyRole)

        val dummyUser = User(
            id = 0L,
            email = "dummyUser",
            password = passwordEncoder.encode("dummyPassword"),
            roles = setOf(savedRole)
        )

        userRepository.save(dummyUser)
        raffleRepository.save(raffle1)
        raffleRepository.save(raffle2)
    }
}
