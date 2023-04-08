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

# Install dependencies 
RUN npm install && npm cache clean --force && npm install -g typescript

# Copy the rest of the application code
COPY . .

RUN npx prisma generate

# Expose the port the application will listen on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "run", "build"]


