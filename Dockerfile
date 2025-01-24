# Step 1: Build the Angular app
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy the Angular project files to the container
COPY . .

# Install dependencies
RUN npm install

# Build the Angular app for production
RUN npm run build --prod

# Step 2: Set up Nginx
FROM nginx:alpine

# Copy the built Angular files to the Nginx web directory
COPY --from=build /app/dist/Consommation-de-PigeonSkyRace /usr/share/nginx/html

# Copy custom Nginx configuration file (optional)
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
