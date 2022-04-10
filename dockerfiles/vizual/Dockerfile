FROM node:14.16.1-alpine3.13

# Create app path
RUN mkdir -p /vizual && chmod -R 777 /vizual
ENV APP_PATH /vizual
WORKDIR $APP_PATH

# Download dependencies
COPY package.json package-lock.json ./
RUN npm cache verify && \
    npm cache clean --force && \
    npm install --verify --unsafe-perm

# Copy source files
COPY . $APP_PATH

# Build code
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]