# Use the official gradle image to create a build artifact.
# https://hub.docker.com/_/gradle
FROM gradle:7.4.1-jdk17 as builder

# Set the working directory
WORKDIR /home/gradle/project

# Copy local code to the container image.
COPY build.gradle ./
COPY src ./src

# Build a release artifact.
RUN gradle clean bootJar --no-daemon

FROM openjdk:17-jdk-alpine

# Copy the jar to the production image from the builder stage.
COPY --from=builder /home/gradle/project/build/libs/*.jar /app.jar

EXPOSE 8080


# Run the web service on container startup.
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
