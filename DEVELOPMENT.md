# AddressFinder Magento

## Development

First, download [Docker for Mac](https://docs.docker.com/docker-for-mac/install/)

#### QUICKSTART

    docker-compose -f docker-compose.new.yml up
    docker-compose -f docker-compose.new.yml exec apache rm index.php
    docker-compose -f docker-compose.new.yml exec apache install-magento2

Symlink the AddressFinder plugin to the Magento codebase

    sed -i '' "s/# SYMLINK PLUGIN HERE/- .\/AddressFinder:\/var\/www\/html\/app\/code\/AddressFinder/" docker-compose.new.yml

Change your store configuration to support New Zealand & Australia at `Admin > Stores > Configuration > General > Country Options`


#### Packaging

Run `bash package.sh` to create a zip package for distribution.

-------------

### Setup for Magento 2.0 or 2.1
There are different docker-compose files for the versions of Magento and PHP because they all need individual docker volumes for quicker spin-up in development (i.e. you won't have to re-install Magento every time you switch version).

```
bash setup.sh
docker-compose -f docker-compose.yml -f docker-compose.<versions>.yml up app
open http://localhost:8000/
```

Create an new admin user. Passwords must be at least 8 characters long, include both numbers and letters, and a variety of cases.

```
docker-compose -f docker-compose.yml -f docker-compose.<versions>.yml exec phpfpm bash
bin/magento admin:user:create --admin-firstname=kate --admin-lastname=norquay --admin-email=kate@mail.com --admin-user=kate --admin-password=G00dG00d
```

Get the Magento Admin path. Each Magento install creates a unique url to the admin portal.

```
docker-compose -f docker-compose.yml -f docker-compose.<versions>.yml exec phpfpm bin/magento info:adminuri
```

-------------

### Logs

You'll find the logs in `/var/www/html/var/log`

-------------

### Javascript
Make your changes to `./src/addressfinder_magento.coffee` then run `gulp` to automatically build the `addressfinder_magento.js` file in the AddressFinder module (See view/frontend/web/js).

Changes will be updated in the Magento codebase immediately.

-------------

### Where to look

The following table indicates which file to edit for making page specific changes:

| File | Page |
| :--- | :--- |
| AddressFinder/AddressFinder/view/frontend/templates/customer.phtml | Website > My Account > Edit Address |
|  AddressFinder/AddressFinder/view/frontend/templates/checkout.phtml | Website > Checkout |
| AddressFinder/AddressFinder/etc/adminhtml/system.xml, AddressFinder/AddressFinder/etc/config.xml | Admin > Stores > Configuration > Services > AddressFinder |

-------------

### Can't see your changes?

##### RequireJS

Magento allows `requirejs-config.js` files to be defined per module. Multiple config files are concatenated into a single file.

When making updates to any `requirejs-config.js`, you may need to recompile static content to see changes.

```
docker-compose -f docker-compose.yml -f docker-compose.<versions>.yml exec phpfpm bash
rm -rf pub/static/*
bin/magento setup:static-content:deploy
```

-------------

##### The `etc` directory

If you modify `etc/adminhtml/system.xml` or `etc/config.xml`, you may need to clear and flush the cache to see changes.

```
docker-compose -f docker-compose.yml -f docker-compose.<versions>.yml exec phpfpm bin/magento cache:clean
docker-compose -f docker-compose.yml -f docker-compose.<versions>.yml exec phpfpm bin/magento cache:flush
```
