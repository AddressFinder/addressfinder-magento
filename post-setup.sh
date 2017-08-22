#!/bin/bash

if ! [ -d "./html" ]; then
  containerid=$(docker ps | grep addressfindermagento_app | awk '{print $1}')
  echo 'Copying Magento files to your local machine (for reference only)'
  docker cp $containerid:/var/www/html ./
fi

echo 'Disabling cache for development purposes'
docker-compose -f docker-compose-php7.yml exec phpfpm ./bin/magento cache:disable

echo 'Setting Magento mode to Developer'
docker-compose -f docker-compose-php7.yml exec phpfpm ./bin/magento deploy:mode:set developer

if ! [ -L "./html/code/AddressFinder" ]; then
  echo 'Installing the AddressFinder module'
  docker-compose -f docker-compose-php7.yml exec phpfpm ./bin/magento module:enable AddressFinder_Widget
  docker-compose -f docker-compose-php7.yml exec phpfpm ./bin/magento setup:upgrade
  docker-compose -f docker-compose-php7.yml exec phpfpm ./bin/magento setup:di:compile
fi