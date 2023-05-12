package com.sneakersite.sneaker.app.models

import com.fasterxml.jackson.annotation.JsonBackReference
import javax.persistence.*
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

@Entity
data class Role(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @NotBlank
    @Size(max = 255)
    val name: String = "",

    @JsonBackReference
    @ManyToMany(mappedBy = "roles")
    val users: Set<User> = emptySet()
)
{
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Role

        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

}