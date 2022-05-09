## Testing

We test the plugin by using docker images for Magento 2. We install the plugin inside this test store.

1. Clone the image for the version of Magento you want to use

    For Magento 2.3

   `git clone --branch 2.3 git@github.com:AddressFinder/docker-magento2.git docker-magento-2.3 && cd docker-magento-2.3`

    For Magento 2.2

   `git clone --branch 2.2 git@github.com:AddressFinder/docker-magento2.git docker-magento-2.2 && cd docker-magento-2.2`

    For Magento 2.1

   `git clone --branch 2.1 git@github.com:AddressFinder/docker-magento2.git docker-magento-2.1 && cd docker-magento-2.1`

2. `docker-compose up`

2. Install Magento. In a new tab run:
 `docker-compose exec web install-magento`

3. In a new tab, edit your `hosts` file to declare `local.magento` as local. 

   to open the file: `sudo vim /etc/hosts`

   add: `127.0.0.1 local.magento`

4. Open your browser at:

  * Admin pages: http://local.magento/index.php/admin
  * Shop pages: http://local.magento/index.php/

  You can login to the admin using the credentials MAGENTO_ADMIN_USERNAME and MAGENTO_ADMIN_PASSWORD from the env file inside your docker container.

If you make a mistake and need to start again you can remove docker images and volumes with this command `docker-compose down --rmi all -v`

5. Install a product

You will need to install a product in your store to use the checkout and test the AddressFinder plugin

a) Log in to the magento admin
b) Click on Catalog/Products
c) Click Add Product
d) Create a new product with the required fields of product name, sku, price and quantity. Also make sure stock status is set to 'In Stock'
e) Click the admin dropdown in the top right corner and select 'customer view'.
f) You should be able to search for your new product in the shop and add it to the cart.

6. Install AdressFinder

Install via composer
a) Switch to the Magento file system owner. It will probably be `su www-data`
b) `composer require addressfinder/module-magento2`
c) `bin/magento module:enable AddressFinder_AddressFinder`
d) `bin/magento setup:upgrade`
e) `bin/magento cache:flush`

### Install manually

a) Checkout the project or download the zip
b) Create the directory ```AddressFinder/AddressFinder``` in ```app/code```.
c) Copy the contents into that directory.
d) `bin/magento module:enable AddressFinder_AddressFinder`
e) `bin/magento setup:upgrade`
f) If not in developer mode
   `bin/magento setup:di:compile`
   `bin/magento setup:static-content:deploy`
g) Finally run
   `bin/magento cache:flush`

7. Enable the AddressFinder Plugin in the store

a) Click on Stores/Configuration.
b) Click on Services and select AddressFinder.
c) Uncheck the 'Use system value' checkbox and enter any configuration options. Save your changes.
d) Now if you visit your store AddressFinder should be working. The country dropdown is set to 'United States' by default, so make sure this is changed to New Zealand or Australia

## Seeing your changes inside your Magento Test store

(These instructions assume you already have Magento and AddressFinder installed.)

1. Navigate to your Docker Magento image, and stop the container if it's running
2. Add this line `- /[PATH TO ADDRESSFINDER MAGENTO]/addressfinder-magento/view/frontend:/var/www/html/vendor/addressfinder/module-magento2/view/frontend` into the docker-compose.yml file, under web volumes. This will add the frontend folder from your addressfinder-magento project into the addressfinder extension folder inside your docker container. You can find the path by navigating to the addressfinder magento folder and typing the command `pwd`

For example:

```
version: '3.0'
services:
  web:
    image: alexcheng/magento2:2.2
    volumes:
      - web-data-test:/var/www/html
      - /Users/katenorquay/addressfinder/addressfinder-magento/view/frontend:/var/www/html/vendor/addressfinder/module-magento2/view/frontend
```

If you want to change the Magento files, as well as the javascript, you can use `- /Users/katenorquay/addressfinder/addressfinder-magento:/var/www/html/vendor/addressfinder/module-magento2`

3. Start docker: `docker-compose up`
4. Bash into the docker container: `docker-compose exec web bash`
5. Clear the cache, compile and deploy static content: `cd /var/www/html/bin && ./magento cache:clean && ./magento cache:flush && ./magento setup:upgrade && ./magento setup:di:compile && ./magento setup:static-content:deploy -f en_GB en_US`
6. Set permissions: `cd .. && chmod 0777 -R var/cache`
7. Now we create a symlink between the addressfinder extension, and Magento's static content. This means that we don't have to recompile the
static content everytime we make a change. First remove the `js` folder from the static content file so we can start fresh:
`rm -rf /var/www/html/pub/static/frontend/Magento/luma/en_GB/AddressFinder_AddressFinder/js`
8. Create the symlink: `ln -s /var/www/html/vendor/addressfinder/module-magento2/view/frontend/web/js /var/www/html/pub/static/frontend/Magento/luma/en_GB/AddressFinder_AddressFinder/js`
9. Build your js files to add them to the static folder: `npm run watch`. Any further changes you make to the `view/frontend/web/js/source/` folder will be watched and recompiled by webpack.

## Deployment

The Magento plugin is deployed in two ways - through Composer and through the Magento MarketPlace. For both, create a release and update the version number in all the necessary files:
- `composer.json`
- `etc/module.xml`
- `package.json` and `package-lock.json`
- `view/base/web/js/source/magento-plugin.js`
- `README.md`

Add an entry to CHANGELOG.md, describing the change

run `npm run build` to compile the JavaScript.

### Composer deploys

For a composer deploy, simply push a new git tag to the master branch, after you have merged your changes. This tag will be picked up and deployed automatically.

```
git tag 1.1.3
git push --tags origin master
```

### Magento Marketplace deploys

For a Magento Marketplace deploy you need to create a zip package for distribution. Run `bash package.sh`. You will be prompted to enter the version
number of your new release. Once you enter it, a file named something like 'addressfinder_addressfinder-1.1.5.zip' will be created in this directory.
This file can be uploaded to the Magento Marketplace by Matt, who will add all the necessary release information.


## Troubleshooting

You may run into permissions issues. You can give read/write permissions for all files using: `chmod 0777 -R .`
