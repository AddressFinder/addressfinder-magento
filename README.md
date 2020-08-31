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

    <!--
        Listen to the "addressfinder_form_config" event. If you're building an admin
        form, you'll need to listen to "addressfinder_form_config_admin" instead.
    -->
    <event name="addressfinder_form_config">
        <observer name="checkout_billing_address" instance="MyCompany\MyModule\Observer\FormConfig\AddMyForm"/>

    </event>
</config>
```

You'll need to create your own observer class to hook into the event and create a new form configuration that relates to the HTML on the page where you'd like to see AddressFinder *(The available options may be found in the [AddressFinder documentation](https://addressfinder.com.au/docs/))*. An example observer with support for state mapping within Australia could be:

```php
<?php

namespace MyCompany\MyModule\Observer\FormConfig;

use AddressFinder\AddressFinder\Model\FormConfigProvider;
use AddressFinder\AddressFinder\Observer\FormConfig\Base;
use Exception;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;

class AddMyForm extends Base
{
  	/**
     * A unique identifier for the form.
     *
     * @var string
     */
    const FORM_ID = 'my.form.id';

    /**
     * @inheritDoc
     *
     * @throws Exception
     */
    protected function addForm(Collection $forms)
    {
        $forms->addItem(new DataObject([
            'id' => self::FORM_ID,
            'label' => 'My Form',
            'layoutSelectors' => ['li#opc-shipping_method'],
            'countryIdentifier' => '.form-shipping-address select[name=country_id]',
            'searchIdentifier' => '.form-shipping-address input[name="street[0]"]',
            'nz' => [
                'countryValue' => 'NZ',
                'elements' => [
                    'address1' => '.form-shipping-address input[name="street[0]"]',
                    'address2' => '.form-shipping-address input[name="street[1]"]',
                    'suburb' => '.form-shipping-address input[name="street[2]"]',
                    'city' => '.form-shipping-address input[name=city]',
                    'region' => '.form-shipping-address input[name=region]',
                    'postcode' => '.form-shipping-address input[name=postcode]',
                ],
                'regionMappings' => null,
            ],
            'au' => [
                'countryValue' => 'AU',
                'elements' => [
                    'address1' => '.form-shipping-address input[name="street[0]"]',
                    'address2' => '.form-shipping-address input[name="street[1]"]',
                    'suburb' => '.form-shipping-address input[name="city"]',
                    'state' => $this->getStateMappings('AU')
                        ? '.form-shipping-address select[name=region_id]'
                        : '.form-shipping-address input[name=region]',
                    'postcode' => '.form-shipping-address input[name=postcode]',
                ],
                'stateMappings' => $this->getStateMappings('AU'),
            ],
        ]));
    }
}
```

Of course, feel free to replace this with any logic suitable to your store.

> You may even modify an existing form configuration it by interacting with the `forms` property of the `addForm(Collection $forms)` method.

If you're adding forms to a page that we don't already support, such as [these admin pages](https://github.com/abletech/addressfinder-magento/tree/develop/view/adminhtml/layout) or [these frontend pages](https://github.com/abletech/addressfinder-magento/tree/develop/view/frontend/layout), you'll need to enabled AddressFinder on that page. For example, to enable AddressFinder on the home page, create the following `cms_index_index.xml` file in the [appropriate location](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/layouts/layout-overview.html) within your store:

```xml
<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>

        <!-- Add the AddressFinder plugin to the page -->
        <referenceContainer name="before.body.end">
            <block class="AddressFinder\AddressFinder\Block\Plugin" name="addressfinder.plugin"/>
        </referenceContainer>

    </body>
</page>
```

# Debugging
If you are debugging a customer site, you can type `window.addressfinderDebugMode()` into the javascript console. This will reinitialise the widget, with the debug flag set to true, so you can see console logs from the addressfinder-webpage-tools npm package. This works in all modern browsers, and IE11.
