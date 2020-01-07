# AddressFinder Magento

## Installing the Plugin

### Install via composer

1. Switch to the Magento file system owner. It will probably be `su www-data`
2. `composer require addressfinder/module-magento2`
3. `bin/magento module:enable AddressFinder_AddressFinder`
4. `bin/magento setup:upgrade`
5. `bin/magento cache:flush`

### Install manually

1. Checkout the project or download the zip
2. Create the directory ```AddressFinder/AddressFinder``` in ```app/code```.
3. Copy the contents into that directory.
4. `bin/magento module:enable AddressFinder_AddressFinder`
5. `bin/magento setup:upgrade`
6. If not in developer mode
   `bin/magento setup:di:compile`
   `bin/magento setup:static-content:deploy`
7. Finally run
   `bin/magento cache:flush`

## Enable the AddressFinder Plugin in the store

1. Click on Stores/Configuration.
2. Click on Services and select AddressFinder.
3. Uncheck the 'Use system value' checkbox and enter any configuration options. Save your changes.
3. Now if you visit your store AddressFinder should be working. The country dropdown is set to 'United States' by default, so make sure this is changed to New Zealand or Australia

## Updating the Plugin

1. Switch to the Magento file system owner. `su www-data`
2. `composer update`
3. Clear the cache, compile and deploy static content: `cd /var/www/html/bin && ./magento cache:clean && ./magento cache:flush && ./magento setup:upgrade && ./magento setup:di:compile && ./magento setup:static-content:deploy -f en_GB en_US`

## Testing

We test the plugin by using docker images for Magento 2. We install the plugin inside this test store.

1. Clone the image for the version of Magento you want to use, then start the container with `docker-compose up`

    For Magento 2.3.2

   `git clone --branch 2.3.2.0 git@github.com:AbleTech/docker-magento2.git docker-magento-2.3.2 && cd docker-magento-2.3.2`

      For Magento 2.3.1

   `git clone --branch 2.3.1.0 git@github.com:AbleTech/docker-magento2.git docker-magento-2.3.1 && cd docker-magento-2.3.1`

      For Magento 2.3

   `git clone --branch 2.3 git@github.com:AbleTech/docker-magento2.git docker-magento-2.3 && cd docker-magento-2.3`

      For Magento 2.2

   `git clone --branch 2.2 git@github.com:AbleTech/docker-magento2.git docker-magento-2.2 && cd docker-magento-2.2`

      For Magento 2.1

   `git clone --branch 2.1 git@github.com:AbleTech/docker-magento2.git docker-magento-2.1 && cd docker-magento-2.1`

2. Install Magento. In a new tab run:
 `docker-compose exec web install-magento`

3. In a new tab, edit your host file to redirect localhost to local.magento

   to open the file: `sudo vim /etc/hosts`

   add: `127.0.0.1 local.magento`

4. Open your browser at:

  * Admin pages: http://local.magento/index.php/admin
  * Shop pages: http://local.magento/index.php/

  You can login to the admin using the credentials MAGENTO_ADMIN_USERNAME and MAGENTO_ADMIN_PASSWORD from the env file inside your docker container.


If you make a mistake and need to start again you can remove docker images and volumes with this command `docker-compose down --rmi all -v`

### Installing A Product

You will need to install a product in your store to use the checkout and test the AddressFinder plugin

1. Log in to the magento admin
2. Click on Catalog/Products
3. Click Add Product
4. Create a new product with the required fields of product name, sku, price and quantity. Also make sure stock status is set to 'In Stock'
5. Click the admin dropdown in the top right corner and select 'customer view'.
6. You should be able to search for your new product in the shop and add it to the cart.


## Making a change

This plugin is made up of three parts:
1. The Magento plugin itself.
2. The Magento JavaScript plugin, which provides the specific configuration for Magento, and connects to a Magento store
3. AddressFinder Webpage Tools. This is an NPM package that adds the autocomplete capability. https://github.com/abletech/addressfinder-webpage-tools

To build the **Magento JavaScript plugin**, simply visit the module's folder and run:
1. `npm install`
2. `npm run build`. These files will be added/updated inside the `view/frontend/layout/web/js` folder. Magento will take care of minification wherever your store is in production mode.

## Supporting new / customised forms

To add support for new forms or customising existing forms, a level of Magento development knowledge is assumed. You'll firstly need your own module. Magento has a [tutorial on creating your module](https://devdocs.magento.com/videos/fundamentals/create-a-new-module/). Within your module, you'll need to [create an observer](https://devdocs.magento.com/guides/v2.3/extension-dev-guide/events-and-observers.html) that'll hook into the form configuration step of the AddressFinder plugin in order to attach your own form configuration.

To begin, you'll need to add the following to your module's `etc/config.xml` (we are assuming your module is called `MyCompany_MyModule`):

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:framework:Event/etc/events.xsd">

    <!-- Listen to the "addressfinder_form_config" event -->
    <event name="addressfinder_form_config">
        <observer name="checkout_billing_address" instance="MyCompany\MyModule\Observer\FormConfig\AddMyForm"/>

    </event>
</config>
```

You'll need to create your own observer class to hook into the event and create a new form configuration that relates to the HTML on the page where you'd like to see AddressFinder *(The available options may be found in the [AddressFinder documentation](https://addressfinder.com.au/docs/))*. An example observer with support for state mapping within Australia could be:

```php
<?php

namespace MyCompany\MyModule\Observer\FormConfig;

use AddressFinder\AddressFinder\Model\StateMappingProvider;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Exception\NoSuchEntityException;
use Psr\Log\LoggerInterface;

class AddMyForm implements ObserverInterface
{
    /**
     * @var StateMappingProvider
     */
    private $stateMappingProvider;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * Creates a new "Add My Form" observer.
     *
     * @param StateMappingProvider $stateMappingProvider
     */
    public function __construct(StateMappingProvider $stateMappingProvider, LoggerInterface $logger)
    {
        $this->stateMappingProvider = $stateMappingProvider;
        $this->logger = $logger;
    }

    /**
     * {@inheritDoc}
     * @throws NoSuchEntityException
     */
    public function execute(Observer $observer)
    {
        /** @var Collection $forms */
        $forms = $observer->getEvent()->getData('forms');

        try {
            $forms->addItem(new DataObject([
                'label' => 'My Form',
                'layoutSelectors' => ['input#street_1'],
                'countryIdentifier' => 'select[name=country_id]',
                'searchIdentifier' => 'input#street_1',
                'nz' => [
                    'countryValue' => 'NZ',
                    'elements' => [
                        'address1' => 'input#street_1',
                        'suburb' => 'input#street_2',
                        'city' => 'input[name=city]',
                        'region' => 'input[name=region]',
                        'postcode' => 'input[name=postcode]',
                    ],
                    'regionMappings' => null,
                ],
                'au' => [
                    'countryValue' => 'AU',
                    'elements' => [
                        'address1' => 'input#street_1',
                        'address2' => 'input#street_2',
                        'suburb' => 'input[name=city]',
                        'state' => 'select[name=region_id]',
                        'postcode' => 'input[name=postcode]',
                    ],
                    'stateMappings' => $this->stateMappingProvider->forCountry('AU'),
                ],
            ]));
        } catch (NoSuchEntityException $e) {
            $this->logger->error(sprintf('Could not fetch state mappings: %s.', $e->getMessage()));
        }
    }
}
```

Of course, feel free to replace this with any logic suitable to your store.

> You may even modify an existing form configuration it by interacting with the `forms` property of the event *(stored as `$forms` in the example above)*.


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
- `module.xml`
- `package.json` and `package-lock.json`
- `magento-plugin.js`

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


# Debugging
If you are debugging a customer site, you can type `window.addressfinderDebugMode()` into the javascript console. This will reinitialise the widget, with the debug flag set to true, so you can see console logs from the addressfinder-webpage-tools npm package. This works in all modern browsers, and IE11.