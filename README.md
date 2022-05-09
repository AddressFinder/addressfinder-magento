# AddressFinder for Magento 2

The AddressFinder module for Magento 2 allows you to find verified [Australian](https://addressfinder.com.au) and [New Zealand](https://addressfinder.nz) addresses with an intuitive, search-as-you-type interface.

## 1. Installation

The module may be installed one of two ways:

1. Composer (recommended)
2. Manual

### 1.1 Via Composer

To install the module via Composer, from the root directory of your Magento installation:

```bash
composer require addressfinder/module-magento2
```

This will automatically fetch the latest compatible version of the module available to your Magento installation. From the root directory of your Magento installation:

```bash
bin/magento module:enable AddressFinder_AddressFinder
bin/magento setup:upgrade
```

### 1.2 Install manually

To install the module manually, download the source code for the latest **compatible version** of the module:

| Magento Version | Latest Compatible Version                                    |
| --------------- | ------------------------------------------------------------ |
| 2.0.*           | [1.3.0 (download)](https://github.com/AddressFinder/addressfinder-magento/releases/tag/v1.3.0) |
| 2.1.*           | [1.5.1 (download)](https://github.com/AddressFinder/addressfinder-magento/releases/tag/v1.5.1) |
| 2.2.*           | [1.5.1 (download)](https://github.com/AddressFinder/addressfinder-magento/releases/tag/v1.5.1) |
| 2.3.*           | [2.0.3 (download)](https://github.com/AddressFinder/addressfinder-magento/releases/tag/v2.0.3) |
| 2.4.*           | [2.0.3 (download)](https://github.com/AddressFinder/addressfinder-magento/releases/tag/v2.0.3) |

Extract the  `.zip` / `.tar.gz` you have downloaded. Copy the **contents of the top-level folder** that was created during extraction into your Magento store in the following location (you must create these folders manually):

```
app/code/AddressFinder/AddressFinder/
```

After copying the contents into this location, you should see a structure containing (but not limited to) the following files/folders:

```
app/code/AddressFinder/AddressFinder/Block/
app/code/AddressFinder/AddressFinder/etc/
app/code/AddressFinder/AddressFinder/Model/
app/code/AddressFinder/AddressFinder/registration.php
app/code/AddressFinder/AddressFinder/...
```

From the root directory of your Magento installation:

```bash
bin/magento module:enable AddressFinder_AddressFinder
bin/magento setup:upgrade
```

### 1.3 Production considerations

Although outside the scope of installing this module, if you are running your Magento store in a production environment, you should run the [Magento code compiler](https://devdocs.magento.com/guides/v2.4/config-guide/cli/config-cli-subcommands-compiler.html) and [deploy static files](https://devdocs.magento.com/guides/v2.4/config-guide/cli/config-cli-subcommands-static-deploy-strategies.html):

```bash
bin/magento setup:di:compile
bin/magento setup:static-content:deploy
```

## 2. Updating

The process for updating the module depends on whether you have installed it via Composer or manually.

### 2.1 Via Composer

To update the module via Composer, from the root directory of your Magento installation:

```bash
composer update addressfinder/module-magento2
bin/magento setup:upgrade
```

> If you are running your Magento store in a production environment, refer to <u>Section (1.3) Production Considerations</u>.

### 2.2 Update manually

To update the module manually, referring to the instructions in <u>Section (1.2) Install Manually</u> to download the latest compatible version and copy the files into your Magento codebase. After you have copied these files in, simply upgrade the extension: 

``` bash
bin/magento setup:upgrade
```

> If you are running your Magento store in a production environment, refer to <u>Section (1.3) Production Considerations</u>.

## 3. Configuring the module

The module's settings are controlled within `Stores -> Configuration -> Services -> AddressFinder`.

> Most settings in Magento 2 are guarded with sensible defaults. To customise settings,  you'll need to uncheck the **use system value** for any settings you would like to customise.

### 3.1 Basic functionality

 To get the module functioning in its most basic form, you'll need to:

1. Change **Enabled** to **Yes**.
2. Sign up for a licence key for [Australia](https://addressfinder.com.au/plans/?utm_source=magento&utm_medium=extension&utm_campaign=magento_admin&utm_term=Australia) or [New Zealand](https://addressfinder.nz/plans/?utm_source=magento&utm_medium=extension&utm_campaign=magento_admin&utm_term=New_Zealand) and enter this in the **License** field.

### 3.2 Customisation features

1. Depending on the theme your Magento store has, you may need to configure the **Default Search Country** if your checkout has no country selector.
2. AddressFinder functions across many forms throughout Magento. The default is to enable it in all supported forms, however you may restrict this with the **Enable Specific Forms** setting.
3. Turning on **Debug Mode** will print debug messages from the AddressFinder JavaScript widget to the browser's console.
4. You may pass custom **Widget Options** to the JavaScript widget. This must be a JSON object valid for [Australia](https://addressfinder.com.au/docs/widget_docs?utm_source=magento&utm_medium=extension&utm_campaign=magento_admin&utm_term=Australia#options) or [New Zealand](https://addressfinder.nz/docs/widget_docs?utm_source=magento&utm_medium=extension&utm_campaign=magento_admin&utm_term=New_Zealand#options).

## 4. Forms

The AddressFinder module is installed within Magento by attaching forms. Out of the box, we support the following frontend forms:

1. Checkout billing address
2. Checkout shipping address
3. Customer address book

In addition, we support the following admin forms:

1. Order billing address
2. Order shipping address

### 4.1 Adding a new form (advanced)

Of course, you may wish to add support for a new form. Luckily, this process is fairly straightforward, however a level of Magento development knowledge is assumed.

> **Important:** All of the examples to follow will assume we'll be working with a module called `Acme_CustomForm`.

#### 4.1.1 Module creation

You'll firstly need your own module [create your own module](https://devdocs.magento.com/videos/fundamentals/create-a-new-module/). Begin by creating the following folder structure:

```
app/code/Acme/CustomForm/
app/code/Acme/CustomForm/etc/
app/code/Acme/CustomForm/Observer/Config/Source/Frontend/
app/code/Acme/CustomForm/Observer/FormConfig/Frontend/
```

Create a component registration file at `app/code/Acme/CustomForm/registration.php`:

```php
<?php

use \Magento\Framework\Component\ComponentRegistrar;

ComponentRegistrar::register(ComponentRegistrar::MODULE, 'Acme_CustomForm', __DIR__);
```

And add a module declaration file at `app/code/Acme/CustomForm/etc/module.xml`:

```xml
<?xml version="1.0"?>

<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
    <module name="Acme_CustomForm" setup_version="0.1.0"/>
</config>
```

#### 4.1.2 Event observers

Within your module, you'll need to [create event observers](https://devdocs.magento.com/guides/v2.3/extension-dev-guide/events-and-observers.html) that'll allow us to add our custom forms to the AddressFinder module. We'll create a frontend form for brevity's, however the process is [almost identical](https://github.com/AddressFinder/addressfinder-magento/blob/develop/etc/events.xml) for admin forms.

Begin by creating an events file at `app/code/Acme/CustomForm/etc/events.xml`:

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:framework:Event/etc/events.xsd">
  
    <!-- 
        Attach frontend forms
        (to attach admin forms, simply listen to the event named `addressfinder_form_config_admin` instead)
    -->
    <event name="addressfinder_form_config">
        <observer name="acme_store_locator"
                  instance="Acme\CustomForm\Observer\FormConfig\Frontend\AddStoreLocator"/>
    </event>

    <!-- Attach form selector to admin (optional) -->
    <event name="addressfinder_config_source_forms_enabled">
        <observer name="acme_store_locator"
                  instance="Acme\CustomForm\Observer\Config\Source\Frontend\StoreLocator"/>
    </event>

</config>
```

#### 4.1.3 Form implementation

You'll notice we referred to two new classes within our event observers. We need to implement these classes.:

1. The first class will be used to define the form
2. The second class will add the ability to restrict form selection in the admin. *The second class is optional; only required if you wish to restrict forms instead of showing all.*

Start by creating the form declaration at `app/code/Acme/CustomForm/Observer/FormConfig/Frontend/AddStoreLocator.php`:

```php
<?php

namespace Acme\CustomForm\Observer\FormConfig\Frontend;

use AddressFinder\AddressFinder\Observer\FormConfig\Base;
use Exception;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;

class AddStoreLocator extends Base
{
    const FORM_ID = 'frontend.store.locator';

    /**
     * @inheritDoc
     *
     * @throws Exception
     */
    protected function addForm(Collection $forms): void
    {
        $forms->addItem(new DataObject([
            // A unique form ID to identify this form within the AddressFinder module
            'id' => self::FORM_ID,
          
            // A semantic label
            'label' => 'Store Locatork',
          
            // The selector for where to instantiate the JavaScript widget
            'layoutSelectors' => ['input#street_1'],
          
            // The country selector that switches the form between AU and NZ
            'countryIdentifier' => 'select[name=country_id]',
          
            // The search box selector - this is where your users type to trigger the AddressFinder autocomplete
            'searchIdentifier' => 'input#street_1',
          
            // NZ-specific config
            'nz' => [
                // The value which the `countryIdentifier` is set as to represent NZ
                'countryValue' => 'NZ',
              
                // Varying element selectors to place the selected address result in
                'elements' => [
                    'address1' => 'input#street_1',
                    'suburb' => 'input#street_2',
                    'city' => 'input[name=city]',
                    'region' => 'input[name=region]',
                    'postcode' => 'input[name=postcode]',
                ],
                'regionMappings' => null,
            ],
          
            // AU-specific config
            'au' => [
                // The value which the `countryIdentifier` is set as to represent AU
                'countryValue' => 'AU',
              
                // Varying element selectors to place the selected address result in
                'elements' => [
                    'address1' => 'input#street_1',
                    'address2' => 'input#street_2',
                    'suburb' => 'input[name=city]',
                   
                    // This helper from the base class we extend will allow us to 
                    // support free-form state inputs as well as dropdown menus.
                    'state' => $this->getStateMappings('AU')
                        ? 'select[name=region_id]'
                        : 'input[name=region]',
                    'postcode' => 'input[name=postcode]',
                ],
              
                // State mappings for Australia (if they exist in your Magento installation)
                'stateMappings' => $this->getStateMappings('AU'),
            ],
        ]));
    }
}
```

Now we've added the form, we can optionally add the ability to restrict form selection to this new form within the admin. By default, all configured forms are enabled, however the user has the ability to restrict this list in the admin.

In order to add our new form to this list, create `app/code/Acme/CustomForm/Observer/Config/Source/Frontend/StoreLocator.php`:

```php
<?php

namespace Acme\CustomForm\Observer\Config\Source\Frontend;

use Acme\CustomForm\Observer\FormConfig\Frontend\AddStoreLocator;
use Exception;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;

class StoreLocator implements ObserverInterface
{
    /**
     * @inheritDoc
     *
     * @throws Exception
     */
    public function execute(Observer $observer): void
    {
        /** @var Collection $frontend */
      
        // If you were building an admin form, you'd call `getData('admin')` and append the form to that list
        $frontend = $observer->getEvent()->getData('frontend');

        $frontend->addItem(new DataObject([
            'label' => 'Store Locator',
            'value' => AddStoreLocator::FORM_ID,
        ]));
    }
}
```

Congratulations! You have now configured up a new form for your store selector to integrate with AddressFinder. 🎉

## 5. Debugging JavaScript widget

To debug the JavaScript widget within your Magento store, pull up your browser's [JavaScript console](https://balsamiq.com/support/faqs/browserconsole/) and type:

```js
window.addressfinderDebugMode() // Followed by the `return`/`enter` key.
```

This will reinitialise the widget, with the debug flag set to `true`, so you can see console logs from the [`@addressfinder/addressfinder-webpage-tools` npm package](https://www.npmjs.com/package/@addressfinder/addressfinder-webpage-tools).

> This works in all modern browsers *(and IE11 💀)*

