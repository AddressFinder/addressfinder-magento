#!/bin/bash

gulp production

echo "Enter version number: "
read version

sed -i '' "s/\"version\": \".*\"/\"version\": \""$version"\"/" AddressFinder/Widget/composer.json
sed -i '' "s/\"version\": \".*\"/\"version\": \""$version"\"/" package.json
sed -i '' "s/setup_version=\".*\"/setup_version=\""$version"\"/" AddressFinder/Widget/etc/module.xml

cd AddressFinder/Widget
zip -r "../../addressfinder_widget-"$version".zip" ./* -x '.git/*'
cd ../../