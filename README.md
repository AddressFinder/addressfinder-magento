# AddressFinder Magento

## Development

### Requirements

- [Docker for Mac](https://docs.docker.com/docker-for-mac/install/)

### Setup

```
bash pre-setup.sh
docker-compose run --rm setup
docker-compose up -d app
bash post-setup.sh

open http://localhost:8000/
docker-compose logs -f
```

### requirejs-config.js

Magento allows `requirejs-config.js` files to be defined per module. Multiple config files are concatenated into a single file.

When making updates to any `requirejs-config.js`, you may need to recompile to see changes.

```
docker-compose exec phpfpm bash
rm -rf pub/static/*
bin/magento setup:static-content:deploy
```