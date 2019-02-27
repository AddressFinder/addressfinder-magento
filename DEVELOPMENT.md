# How to test AddressFinder Magento
You need a setup a test environment for each version of Magento you want to test. This may be time consuming.

## Installing Mangento

1. Clone Alex Cheng's docker image for Magento

   ``` git clone  git@github.com:alexcheng1982/docker-magento2.git ```

2. Checkout the tag associated with the version of Magento you want to test.

   ``` git checkout tags/2.2.7 ```

3. Alter the docker file so your data is saved when docker shuts down. This     means that you won't have to reinstall magento or the AddressFinder          plugin every time you want to test.

   You will need to add volumes for db-data and web-data. Notice that /data is removed from the end of the db volume, as this causes some dependencies not to be saved.

   Your docker compose file should look something like this:

    ```
    version: '3.0'
    services:
      web:
        image: alexcheng/magento2:2.2
        volumes: 
          - web-data:/var/www/html
        ports:
          - "80:80"
        links:
          - db
        env_file:
          - env
      db:
        image: mysql:5.6.23
        volumes:
          - db-data:/var/lib/mysql
        env_file:
          - env
      phpmyadmin:
        image: phpmyadmin/phpmyadmin
        ports:
          - "8580:80"
        links:
          - db     
    volumes:
      db-data:
      web-data: 
    ```

4. Start the docker container

    ``` docker-compose up ```

    If your docker-compose file has different name than the standard docker-compose.yml, you will have to run:

    ```docker-compose -f name-of-your-file.yml up```

5. In a seperate tab run: (you should be inside the var/www/html directory)

    ``` docker-compose exec web bash ```

6.  Install Magento

    ``` install-magento ```


7. Edit your host file to redirect localhost to local.magento
   
   to open the file: ``` sudo vim /etc/hosts ```
   
   add: ``` 127.0.0.1 local.magento ```

   [Need help with Vim?](https://sites.google.com/a/abletech.co.nz/wiki/technology-tips/beginners-guide-to-vim)


8. Open your browser at:

  * Admin pages: http://magento.local/index.php/admin
  * Shop pages: http://magento.local/index.php/

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
1. su www-data
2. composer require addressfinder/module-magento2 
3. bin/magento module:enable AddressFinder_AddressFinder
4. bin/magento setup:upgrade
5. bin/magento cache:flush

## Enable the AddressFinder Plugin in the store

1. Click on Stores/Configuration.
2. Click on Services and select AddressFinder.
3. Uncheck the 'Use system value' checkbox and enter any configuration options. Save your changes.
3. Now if you visit your store AddressFinder should be working. The country dropdown is set to 'United States' by default, so make sure this is changed to New Zealand or Australia

## How to Test your Changes
1. Make your changes in the addressfinder-magento.coffee file
2. Run ```gulp```
3. Copy the compiled javascript
3.  ``` docker-compose exec web bash ```
4. Find this javascript file inside the magento container.

   ``` cd vendor/addressfinder/module-magento2/view/frontend/web/js ```

5. You can use vim to paste your changes into this file










