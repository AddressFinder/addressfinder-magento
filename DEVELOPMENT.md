## Testing

We test the plugin by using docker images for Magento 2. We install the plugin inside this test store.

1. Use https://github.com/markshust/docker-magento and the [setup instructions here.](https://github.com/markshust/docker-magento?tab=readme-ov-file#setup)
**IMPORTANT** The directory you are installing to must be completely empty.  See [here](https://github.com/markshust/docker-magento?tab=readme-ov-file#install-fails-because-project-directory-is-not-empty) for additional details.

2. [Install the sample data for the store.](https://github.com/markshust/docker-magento?tab=readme-ov-file#install-sample-data)

3. Start the docker containers:
   `./bin/start`

3. Test the store.
   Visit https://magento.test/admin for the Magento Admin Panel
   Visit https://magento.test/ for the store.
   Visit http://localhost:1080/ for Mailcatcher emails

   The admin login details will be in the `env/magento.env` file `MAGENTO_ADMIN_EMAIL` and `MAGENTO_ADMIN_PASSWORD`

   You can create an account for the store by signing up (emails will go to Mailcatcher)

3. Add to the volumes in `compose.dev.yaml` something like:
   ```
   services:
   app:
      volumes: &appvolumes
         ### other volumes ###
         - /Path/To/Plugin/addressfinder-magento:/var/www/html/app/code/AddressFinder/AddressFinder
   ```

   This ensures that both the Nginx (app) and PHP-FPM (phpfpm) containers can access the plugin code.

4. Restart the docker containers for the change to take effect:
   `./bin/restart`

5. Access the PHP-FPM container (your container name maybe be different):
   `docker exec -it magento-phpfpm-1 bash`

6. Inside the container, run the following command to enable the plugin:
   `bin/magento module:enable AddressFinder_AddressFinder`

7. Run the Magento setup upgrade to install the plugin and apply its schema:
   `bin/magento setup:upgrade`

8. Clear the cache to ensure that the changes take effect:
   `bin/magento cache:flush`

9. Recompile Magento:
   `bin/magento setup:di:compile`

10. Confirm and enable the plugin via https://magento.test/admin
      a) Click on Stores/Configuration.
      b) Click on Services and select AddressFinder.
      c) Uncheck the 'Use system value' checkbox and enter any configuration options. Save your changes.
      d) Now if you visit your store AddressFinder should be working. The country dropdown is set to 'United States' by default, so make sure this is changed to New Zealand or Australia

11. Sign into the store, add some things to your card and head to checkout to add an address and test the plugin for New Zealand and Australian addresses.

### Unit Tests

1. Access the PHP-FPM container (your container name maybe be different):
   `docker exec -it magento-phpfpm-1 bash`

2. Execute tests like:
   `./vendor/bin/phpunit app/code/AddressFinder/AddressFinder/Test/Unit/Model/`

### Changes to the plugin Javascript

If you make changes to the javascript do the following:

1. Access the PHP-FPM container (your container name maybe be different):
   `docker exec -it magento-phpfpm-1 bash`

2. Change to the plugin directory:
   `cd app/code/AddressFinder/AddressFinder/`

3. Run npm install if you haven't already:
   `npm install`

4. Run the build:
   `npm run build`

5. Redeploy the static content to make sure the changes are reflected in the frontend:
   `bin/magento setup:static-content:deploy -f`
   *Note: the -f is to force in development mode*

6. Flush the cache:
   `bin/magento cache:flush`

### Use symlink
These were documented for the old setup.  They have been untested on the above, but sound like they should work and might make it easier if you are making lots of javascript changes.

1. Now we create a symlink between the addressfinder extension, and Magento's static content. This means that we don't have to recompile the
static content everytime we make a change. First remove the `js` folder from the static content file so we can start fresh:
`rm -rf /var/www/html/pub/static/frontend/Magento/luma/en_GB/AddressFinder_AddressFinder/js`
2. Create the symlink: `ln -s /var/www/html/vendor/addressfinder/module-magento2/view/frontend/web/js /var/www/html/pub/static/frontend/Magento/luma/en_GB/AddressFinder_AddressFinder/js`
3. Build your js files to add them to the static folder: `npm run watch`. Any further changes you make to the `view/frontend/web/js/source/` folder will be watched and recompiled by webpack.

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
