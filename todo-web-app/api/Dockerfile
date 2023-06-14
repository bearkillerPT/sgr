# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json ./

# Install application dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port your application runs on
EXPOSE 80

# Start the application
CMD ["npm", "start"]