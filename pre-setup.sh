#!/bin/bash

if ! [ -f "./docker-compose.yml" ]; then
  echo 'Creating docker-compose.yml file'
  cp -n docker-compose-example.yml docker-compose.yml
fi

if ! [ -f ".composer/auth.json" ]; then
  echo 'Creating auth.json file'
  cp -n .composer/auth-example.json .composer/auth.json
  echo "NOW SET YOUR USERNAME AND PASSWORD in auth.json (See Abletech Wiki for credentials)"
  echo "See http://devdocs.magento.com/guides/v2.0/install-gde/prereq/connect-auth.html"
fi