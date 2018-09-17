#!/bin/bash

gulp production

echo "Enter version number: "
read version

sed -i '' "s/\"version\": \".*\"/\"version\": \""$version"\"/" composer.json
sed -i '' "s/\"version\": \".*\"/\"version\": \""$version"\"/" package.json
sed -i '' "s/setup_version=\".*\"/setup_version=\""$version"\"/" etc/module.xml

zip -r "../../addressfinder_addressfinder-"$version".zip" ./* -x '.git/*' -x 'node_modules/*'
