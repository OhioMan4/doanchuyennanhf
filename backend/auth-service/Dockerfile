FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install
RUN chmod +x ./node_modules/.bin/nodemon


# Copy all source code
COPY . .

# Expose port
EXPOSE 3000


CMD ["npm","start"]
