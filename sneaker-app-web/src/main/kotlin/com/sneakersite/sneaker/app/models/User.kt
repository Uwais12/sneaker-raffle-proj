package com.sneakersite.sneaker.app.models

import com.fasterxml.jackson.annotation.JsonManagedReference
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener::class)
data class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(unique = true)
    @Email
    @NotBlank
    @Size(max = 255)
    val email: String = "",

    @NotBlank
    @Size(min = 6, max = 255)
    val password: String = "",

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_entries",
        joinColumns = [JoinColumn(name = "user_id")],
        inverseJoinColumns = [JoinColumn(name = "raffle_id")]
    )
    val rafflesEntered: MutableSet<Raffle> = HashSet(),

    @JsonManagedReference
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_role",
        joinColumns = [JoinColumn(name = "user_id")],
        inverseJoinColumns = [JoinColumn(name = "role_id")]
    )
    val roles: Set<Role> = emptySet(),

    @Column(nullable = false, updatable = false)
    val created_at: LocalDateTime = LocalDateTime.now(),

    @Column(nullable = false)
    var updated_at: LocalDateTime = LocalDateTime.now()



)
{
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as User

        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }
}

