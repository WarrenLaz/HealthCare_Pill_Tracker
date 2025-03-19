# Use Node.js as the base image
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .

# Expose Metro Bundler's default port (needed for React Native development)
EXPOSE 8081

# Start the React Native development server
CMD ["npx", "expo", "start", "--tunnel"]
