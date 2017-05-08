#!/bin/bash

if ! [ -d "./html" ]; then
  containerid=$(docker ps | grep addressfindermagento_app | awk '{print $1}')
  echo 'Copying Magento files to your local machine'
  docker cp $containerid:/var/www/html ./
fi

if ! [ -L "./html/app/code/AddressFinder" ]; then
  echo 'Symlinking the AddressFinder module'
  ln -s ../../../AddressFinder/ html/app/code/AddressFinder
fi

echo 'Uncommenting app volumes in docker-compose.yml'
sed -i '/# - ./html/app/code/c\- ./html/app/code' docker-compose.yml
sed -i '/# - ./html/app/design/c\- ./html/app/design' docker-compose.yml