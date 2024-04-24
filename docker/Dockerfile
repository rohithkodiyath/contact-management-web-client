# Stage 1: Build the Angular app in Node.js
FROM node:16-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ../*.json ./

# Install all the dependencies
RUN npm install

# Copy the resockt of your application code
COPY ../ .

# Build the project
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=builder /app/dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
#CMD ["nginx", "-g", "daemon off;"]
CMD sed -i "s/localhost:8080/$HOST_URL/g" /usr/share/nginx/html/main*.js && nginx -g 'daemon off;'
