# Use an official Node.js LTS (Long Term Support) image as the base
FROM node:lts-alpine AS react-build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application
COPY . ./

# Build the application
RUN npm run build

# Nginx stage
FROM nginx:alpine

# Copy the nginx configuration
COPY nginx.conf /etc/nginx/conf.d/configfile.template

# Copy static build directory from react-build stage
COPY --from=react-build /app/build /usr/share/nginx/html

# Set environment variables
ENV PORT 8080
ENV HOST 0.0.0.0

# Expose the application on port 8080
EXPOSE 8080

# Substitute the PORT environment variable and start Nginx in the foreground
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
