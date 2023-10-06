FROM node:16-alpine3.16

# Set the working directory in the container
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Define the command to start the application
CMD [ "npm", "start" ]