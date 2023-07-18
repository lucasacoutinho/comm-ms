FROM gradle:jdk17 AS TEMP_BUILD_IMAGE

ENV APP_DIR=/app

# Set the working directory to /app
WORKDIR $APP_DIR

# Build dependencies
COPY build.gradle settings.gradle gradlew $APP_DIR

COPY gradle $APP_DIR/gradle

# Copy the current directory contents into the container at /app
COPY . .

# Build the project
RUN gradle build -x test --no-daemon

# Run the jar file
FROM openjdk:17 AS SERVER

ENV APP_DIR=/app

ENV ARTIFACT_NAME=product-api-0.0.1-SNAPSHOT.jar

# Set the working directory to /app
WORKDIR $APP_DIR

# Copy the the jar file from the previous stage to the current stage at /app
COPY --from=TEMP_BUILD_IMAGE $APP_DIR/build/libs/$ARTIFACT_NAME .

EXPOSE 3333

# Run the jar file
CMD java -jar ${ARTIFACT_NAME}
