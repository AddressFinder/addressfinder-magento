#!/bin/bash

echo "Enter version number: "
read version

sed -i '' "s/\"version\": \".*\"/\"version\": \""$version"\"/" composer.json
sed -i '' "s/\"version\": \".*\"/\"version\": \""$version"\"/" package.json
sed -i '' "s/setup_version=\".*\"/setup_version=\""$version"\"/" etc/module.xml

git archive -o "addressfinder_addressfinder-"$version".zip" HEAD
