# Extending image
FROM node:alpine

# Versions
RUN npm -v
RUN node -v

# App directory
WORKDIR /app

# Environment variables
ENV NODE_ENV production
ENV PORT 3000

# Install app dependencies
COPY src/package.json /app
RUN npm install --production

# Bundle app source
COPY src/ /app

# Port to listener
EXPOSE $PORT

# Main command
CMD ["npm", "start"]
