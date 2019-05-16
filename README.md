# AddressFinder Magento

## Testing
Follow the instructions in DEVELOPMENT.md to setup your test environment and install the AddressFinder plugin to your magento store.

## Building

1. `npm install`
2. `gulp`


## Deployment

The Magento plugin is deployed in two ways - through Composer and through the Magento MarketPlace. For both, create a release and update the version number in all the necessary files:
- composer.json
- module.xml
- package.json and package-lock.json
- magento_plugin.js

Add an entry to CHANGELOG.md, describing the change

run `npm run build:production` to compile the js.

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

