# How to test AddressFinder Magento
You need to setup a test environment for each version of Magento you want to test. This may be time consuming.

## Installing Magento

1. Clone the docker image for Magento. Check out the branch associated with the version of Magento you want. You will need a seperate clone
   for each version of Magento you want

   For Magento 2.3

   `git clone --branch 2.3 git@github.com:AbleTech/docker-magento2.git docker-magento-2.3`

      For Magento 2.2

   `git clone --branch 2.2 git@github.com:AbleTech/docker-magento2.git docker-magento-2.2`

      For Magento 2.1

   `git clone --branch 2.1 git@github.com:AbleTech/docker-magento2.git docker-magento-2.1`

      For Magento 2.0

   `git clone --branch 2.0 git@github.com:AbleTech/docker-magento2.git docker-magento-2.0`

2. Start the docker container

    `docker-compose up`

3. In a seperate tab run: (after running this command, you should be inside the var/www/html directory)

    `docker-compose exec web bash`

4.  Install Magento

    `install-magento`


5. In a new tab, edit your host file to redirect localhost to local.magento

   to open the file: `sudo vim /etc/hosts`

   add: `127.0.0.1 local.magento`

   [Need help with Vim?](https://sites.google.com/a/abletech.co.nz/wiki/technology-tips/beginners-guide-to-vim)


8. Open your browser at:

  * Admin pages: http://local.magento/index.php/admin
  * Shop pages: http://local.magento/index.php/

  You can login to the admin using the credentails MAGENTO_ADMIN_USERNAME and MAGENTO_ADMIN_PASSWORD from the env file.


## Installing A Product

1. Log in to the magento admin
2. Click on Catalog/Products
3. Click Add Product
4. Create a new product with the required fields of product name, sku, price and quantity. Also make sure stock status is set to 'In Stock'
5. Click the admin dropdown in the top right corner and select 'customer view'.
6. You should be able to search for your new product in the shop and add it to the cart.


## Installing the AddressFinder Plugin

Inside the docker container run:
1. `su www-data`
2. `composer require addressfinder/module-magento2`
3. `bin/magento module:enable AddressFinder_AddressFinder`
4. `bin/magento setup:upgrade`
5. `bin/magento cache:flush`

## Enable the AddressFinder Plugin in the store

1. Click on Stores/Configuration.
2. Click on Services and select AddressFinder.
3. Uncheck the 'Use system value' checkbox and enter any configuration options. Save your changes.
3. Now if you visit your store AddressFinder should be working. The country dropdown is set to 'United States' by default, so make sure this is changed to New Zealand or Australia

## How to Test your Changes
1. Make your changes in the addressfinder-magento.coffee file
2. Run `gulp`
3. Copy the compiled javascript
3.  `docker-compose exec web bash`
4. Find this javascript file inside the magento container.

   `cd vendor/addressfinder/module-magento2/view/frontend/web/js`

5. You can use vim to paste your changes into this file

## Making changes to the requirejs-config.js file
In order to make an update to the requirejs file, we need to edit that file inside the AddressFinder extension, then remove a different
file (also named requirejs-config.js) from the the static folder. Then we clear the cache and recompile the static content to see our change.

1. `docker-compose exec web bash`
2. `cd vendor/addressfinder/module-magento2/view/frontend/web`
3. `vim requirejs-config.js`
4. Make your change and save.
5. `cd /var/www/html/pub/static/frontend/Magento/luma/en_US`
6. `rm requirejs-config.js`
7. `cd /var/www/html`
8. `bin/magento cache:clean`
9. `bin/magento cache:flush`
10. `bin/magento setup:upgrade`
11. `bin/magento setup:di:compile`
12. `bin/magento setup:static-content:deploy -f`











