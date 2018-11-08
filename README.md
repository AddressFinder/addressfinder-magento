# AddressFinder Magento

## Using the Magento 2 plugin

Follow the user guide on the AddressFinder website:

- [Australian website](https://addressfinder.com.au/docs/magento-2-user-guide/)
- [New Zealand website](https://addressfinder.nz/docs/magento-2-user-guide/)

## Installation

To install the AddressFinder module for Magento 2, simply run:

```bash
composer require addressfinder/module-magento2
bin/magento module:enable AddressFinder_AddressFinder
bin/magento setup:upgrade
bin/magento cache:flush
```

You'll generally need to recompile your dependency injection cache and redeploy themes, especially in production. This process varies from site to site and is outside the context of installing this module, but generally is:

```bash
bin/magento setup:di:compile
bin/magento setup:static-content:deploy
```