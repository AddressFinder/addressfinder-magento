#!/bin/bash

echo 'Composer Authentication will be required...'
echo 'Credentials are located at https://sites.google.com/a/abletech.co.nz/wiki/addressfinder/credentials/'

echo "Which Magento 2 version? 2.0/[2.1]:"
read mageversion

if [ -z $mageversion ]; then
  mageversion='2.1'
fi

echo "Which PHP version? 5.6/[7.0]:"
read phpversion

if [ -z $phpversion ]; then
  phpversion='7.0'
fi

phpversion=$(echo $phpversion | sed -e 's/\.//g')
mageversion=$(echo $mageversion | sed -e 's/\.//g')

docker-compose -f docker-compose.yml -f docker-compose.mage$mageversion-php$phpversion.yml run --rm setup
docker-compose -f docker-compose.yml -f docker-compose.mage$mageversion-php$phpversion.yml up -d app

# if ! [ -d "./html" ]; then
  # containerid=$(docker ps | grep addressfindermagento_app | awk '{print $1}')
#   echo 'Copying Magento files to your local machine (for reference only)'
#   docker cp $containerid:/var/www/html ./
# fi

echo 'Disabling cache for development purposes'
docker-compose -f docker-compose.yml -f docker-compose.mage$mageversion-php$phpversion.yml exec phpfpm ./bin/magento cache:disable

echo 'Setting Magento mode to Developer'
docker-compose -f docker-compose.yml -f docker-compose.mage$mageversion-php$phpversion.yml exec phpfpm ./bin/magento deploy:mode:set developer

if ! [ -L "./html/code/AddressFinder" ]; then
  echo 'Installing the AddressFinder module'
  docker-compose -f docker-compose.yml -f docker-compose.mage$mageversion-php$phpversion.yml exec phpfpm ./bin/magento module:enable AddressFinder_AddressFinder
  docker-compose -f docker-compose.yml -f docker-compose.mage$mageversion-php$phpversion.yml exec phpfpm ./bin/magento setup:upgrade
  docker-compose -f docker-compose.yml -f docker-compose.mage$mageversion-php$phpversion.yml exec phpfpm ./bin/magento setup:di:compile
fi

docker-compose -f docker-compose.yml -f docker-compose.mage$mageversion-php$phpversion.yml down

echo 'Setup finished.'
