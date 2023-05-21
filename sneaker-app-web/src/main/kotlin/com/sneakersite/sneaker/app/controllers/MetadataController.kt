package com.sneakersite.sneaker.app.controllers

import org.jsoup.Jsoup
import org.jsoup.HttpStatusException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.io.IOException

@RestController
@RequestMapping("/api/metadata")
class MetadataController {

    data class Metadata(
            val title: String?,
            val description: String?,
            val images: List<String>?,
            val url: String?,
            val siteName: String?,
            val type: String?,
            val twitterCard: String?,
            val twitterSite: String?,
            val twitterCreator: String?,
            val favicon: String?,
            val ogImage: String?

    )

    @GetMapping
    fun getMetadata(@RequestParam url: String): ResponseEntity<Any> {
        return try {
            val doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537")
                    .get()

            val title = doc.select("meta[property=og:title]").first()?.attr("content")
            val description = doc.select("meta[name=description]").first()?.attr("content")
            val images = doc.select("img[src]").mapNotNull { it.attr("abs:src") }
            val canonicalUrl = doc.select("meta[property=og:url]").first()?.attr("content")
            val siteName = doc.select("meta[property=og:site_name]").first()?.attr("content")
            val type = doc.select("meta[property=og:type]").first()?.attr("content")
            val twitterCard = doc.select("meta[name=twitter:card]").first()?.attr("content")
            val twitterSite = doc.select("meta[name=twitter:site]").first()?.attr("content")
            val twitterCreator = doc.select("meta[name=twitter:creator]").first()?.attr("content")
            val favicon = doc.select("link[rel=shortcut icon]").first()?.attr("abs:href")
            val ogImage = doc.select("meta[property=og:image]").first()?.attr("content")

            val metadata = Metadata(title, description, images, canonicalUrl, siteName, type, twitterCard, twitterSite, twitterCreator, favicon, ogImage)
            ResponseEntity.ok(metadata)
        } catch (e: HttpStatusException) {
            ResponseEntity.status(e.statusCode).body(mapOf("error" to e.message))
        } catch (e: IOException) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mapOf("error" to "Invalid URL or unable to connect"))
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mapOf("error" to "An unexpected error occurred"))
        }
    }
}
