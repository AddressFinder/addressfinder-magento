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
```

### Making changes
To modify the generic Javascript, make your necessary changes to `./src/addressfinder_magento.coffee` then run `gulp` to automatically build the `addressfinder_magento.js` file in the AddressFinder module.

The following table indicates which file to edit for making page specific changes:

| Page | File |
| :--- | :--- |
| Website > My Account > Edit Address | AddressFinder/Widget/view/frontend/templates/customer_address_form.phtml |
| Website > Checkout | AddressFinder/Widget/view/frontend/templates/checkout_index_index.phtml |
| Admin > Stores > Configuration > Services > AddressFinder | AddressFinder/Widget/etc/adminhtml/system.xml, AddressFinder/Widget/etc/config.xml |

### Access to Magento Admin
Each Magento install creates a unique url to the admin portal.

```
docker-compose exec phpfpm bin/magento info:adminuri
```

### Can't see your changes?

#### RequireJS

Magento allows `requirejs-config.js` files to be defined per module. Multiple config files are concatenated into a single file.

When making updates to any `requirejs-config.js`, you may need to recompile static content to see changes.

```
docker-compose exec phpfpm bash
rm -rf pub/static/*
bin/magento setup:static-content:deploy
```

#### The `etc` directory

If you modify `etc/adminhtml/system.xml` or `etc/config.xml`, you may need to clear and flush the cache to see changes.

```
docker-compose exec phpfpm bin/magento cache:clean
docker-compose exec phpfpm bin/magento cache:flush
```

## Packaging

Run `bash package.sh` to create a zip package for distribution.