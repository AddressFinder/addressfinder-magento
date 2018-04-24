#!/bin/bash

if ! [ -f ".composer/auth.json" ]; then
  echo 'Creating .composer/auth.json file'
  cp -n .composer/auth-example.json .composer/auth.json
  echo 'Credentials located at https://sites.google.com/a/abletech.co.nz/wiki/addressfinder/credentials/'

  echo "PUBLIC_KEY:"
  read publickey

  echo "PRIVATE_KEY:"
  read privatekey

  sed -i '' s/MAGENTO_PUBLIC_KEY/$publickey/ .composer/auth.json
  sed -i '' s/MAGENTO_PRIVATE_KEY/$privatekey/ .composer/auth.json

  echo "More info: http://devdocs.magento.com/guides/v2.0/install-gde/prereq/connect-auth.html"
fi

echo "Which PHP version? 5/[7]:"
read phpversion

if [ -z $phpversion ]; then
  phpversion=7
fi

docker-compose -f docker-compose-php$phpversion.yml run --rm setup
docker-compose -f docker-compose-php$phpversion.yml up app -d

if ! [ -d "./html" ]; then
  containerid=$(docker ps | grep addressfindermagento_app | awk '{print $1}')
  echo 'Copying Magento files to your local machine (for reference only)'
  docker cp $containerid:/var/www/html ./
fi

echo 'Disabling cache for development purposes'
docker-compose -f docker-compose-php$phpversion.yml exec phpfpm ./bin/magento cache:disable

echo 'Setting Magento mode to Developer'
docker-compose -f docker-compose-php$phpversion.yml exec phpfpm ./bin/magento deploy:mode:set developer

if ! [ -L "./html/code/AddressFinder" ]; then
  echo 'Installing the AddressFinder module'
  docker-compose -f docker-compose-php$phpversion.yml exec phpfpm ./bin/magento module:enable AddressFinder_Widget
  docker-compose -f docker-compose-php$phpversion.yml exec phpfpm ./bin/magento setup:upgrade
  docker-compose -f docker-compose-php$phpversion.yml exec phpfpm ./bin/magento setup:di:compile
fi

docker-compose down

echo 'Setup finished. Open http://localhost:8000'