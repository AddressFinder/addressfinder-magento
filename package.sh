#!/bin/bash

echo "Enter version number: "
read version

sed -i '' "s/\"version\": \".*\"/\"version\": \""$version"\"/" AddressFinder/Widget/composer.json
sed -i '' "s/setup_version=\".*\"/setup_version=\""$version"\"/" AddressFinder/Widget/etc/module.xml

zip -r "addressfinder_widget-"$version".zip" AddressFinder/Widget/ -x 'AddressFinder/Widget/.git/*'