###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20.10.0-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:20.10.0-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./

# Copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Clean up unnecessary files
RUN npm prune --production && npm cache clean --force

USER node

###################
# RUN PRODUCTION BUILD
###################

FROM node:20.10.0-alpine AS production

WORKDIR /usr/src/app

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Set the environment variable
ENV PORT 8080
ENV DB_URL mongodb+srv://randularj97:Iqkk1PlWBSYik2EE@service-app.ksbmhdm.mongodb.net/?retryWrites=true&w=majority&appName=service-app
ENV JWT_SECRET topsecretkeyrandulabasnayaka
ENV JWT_EXPIRE 2d

# Expose the port
EXPOSE 8080

# Start the server using the production build
CMD [ "node", "dist/main.js" ]