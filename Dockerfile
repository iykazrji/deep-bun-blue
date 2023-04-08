###################################################################################################
# Base image for production
###################################################################################################
FROM node:16-alpine AS production

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Copy Prisma
COPY /prisma .

# Install production dependencies only
RUN npm install --production

# Copy the rest of the application code
COPY . .

RUN npx prisma generate

# Expose the port the application will listen on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "build"]


