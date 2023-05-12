package com.sneakersite.sneaker.app

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SneakerAppApplication

fun main(args: Array<String>) {
	runApplication<SneakerAppApplication>(*args)
}
