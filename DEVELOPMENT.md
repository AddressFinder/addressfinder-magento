# How to test AddressFinder Magento
You need to setup a test environment for each version of Magento you want to test. This may be time consuming.

## Installing Magento

1. Clone the docker image for Magento into your workspace. Check out the branch associated with the version of Magento you want. You will need a seperate clone for each version of Magento you want.

   For Magento 2.3

   `git clone --branch 2.3 git@github.com:AbleTech/docker-magento2.git docker-magento-2.3 && cd docker-magento-2.3`

      For Magento 2.2

   `git clone --branch 2.2 git@github.com:AbleTech/docker-magento2.git docker-magento-2.2 && cd docker-magento-2.2`

      For Magento 2.1

   `git clone --branch 2.1 git@github.com:AbleTech/docker-magento2.git docker-magento-2.1 && cd docker-magento-2.1`

      For Magento 2.0

   `git clone --branch 2.0 git@github.com:AbleTech/docker-magento2.git docker-magento-2.0 && cd docker-magento-2.0`

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

## Building your changes
1. `npm install`
2. Make your changes in the source directory. If you are making a change to the addressfinder-webpage-tools npm package, you will need to copy and paste the minified file inside the addressfinder-webpage-tools.js file in the source directory. Magento doesn't have support for npm, so we can't include the package in the normal way.
3. To build run `npm run build` or `npm run build:production` if you want the file minified. These files will be added/updated inside the /view/frontend/layout/web/js folder.  


## How to Test your Changes

The easiest way to test your changes is to copy the frontend directory into your docker image for Magento, and make your changes in there.

1. Navigate to your docker image. For example `docker-magento-2.2`
2. Run the steps to install Magento and the AddressFinder plugin, if you haven't already.
3. Stop your docker container if it is running.
4. Copy and paste the frontend directory from this project into the root of your docker image project.
5. Add this line `- ./frontend:/var/www/html/vendor/addressfinder/module-magento2/view/frontend` into the docker-compose.yml file, under web volumes.

For example: 

``` 
version: '3.0'
services:
  web:
    image: alexcheng/magento2:2.2
    volumes: 
      - web-data-test:/var/www/html
      - ./frontend:/var/www/html/vendor/addressfinder/module-magento2/view/frontend
```

6. `docker-compose up`
7. You can now make changes to the js in the docker image frontend folder. To see these changes reflected in the store:
 a) `docker-compose exec web bash`
 b) `cd /var/www/html/bin && ./magento cache:clean && ./magento cache:flush && ./magento setup:upgrade && ./magento setup:di:compile && ./magento setup:static-content:deploy -f en_GB`
 c) `cd .. && chmod 0777 -R var/cache`

 These commands open the docker container, clear the cache and redeploy the static content, and make sure you have the correct permissions.
 You will need to run these commands everytime you make a change.












1. `npm install`
2. Make your changes in the addressfinder-magento.coffee file
3. Run `gulp`
4. Copy the compiled javascript
5.  `docker-compose exec web bash`
6. Find this javascript file inside the magento container.

   `cd vendor/addressfinder/module-magento2/view/frontend/web/js`

7. You can use vim to paste your changes into this file

9. `cd /var/www/html/bin && ./magento cache:clean && ./magento cache:flush && ./magento setup:upgrade && ./magento setup:di:compile && ./magento setup:static-content:deploy -f en_GB`

You may need to run this command so you have the correct permissions.
`cd .. && chmod 0777 -R var/cache`
