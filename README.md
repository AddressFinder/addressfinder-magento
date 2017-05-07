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