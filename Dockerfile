# Use the official Node.js image.
FROM node:22-alpine

# Create and set the working directory.
WORKDIR /app

# Copy dependency definitions.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy project files.
COPY . .

# Expose the port the app runs on.
EXPOSE 8080

# Start the app.
CMD ["npm", "start"]