#!/bin/sh

#  ___                  ___
# | __|_ _ _ _  __ _  _| _ \__ _ __ _ ___ ___
# | _/ _` | ' \/ _| || |  _/ _` / _` / -_|_-<
# |_|\__,_|_||_\__|\_, |_| \__,_\__, \___/__/
#                  |__/         |___/
# 
# This file is part of kristuff/apache-fancy-pages.
# Version 0.1.7
# Copyright (c) 2021 Kristuff <kristuff@kristuff.fr>
#
# For the full copyright and license information, please view the LICENSE
# file that was distributed with this source code.


# our dist directory
mkdir -p dist

# create a clean debian package directory
rm -rf debian
mkdir -p debian/DEBIAN
mkdir -p debian/usr/share/apache-fancy-pages
mkdir -p debian/usr/share/doc/apache-fancy-pages
mkdir -p debian/etc/apache2/conf-available

# populate the debian directory
cp deb/control                  debian/DEBIAN
cp deb/copyright                debian/usr/share/doc/apache-fancy-pages
cp -R tests                     debian/usr/share/doc/apache-fancy-pages
cp -R assets/css                debian/usr/share/apache-fancy-pages
cp -R assets/js                 debian/usr/share/apache-fancy-pages
cp -R assets/icons              debian/usr/share/apache-fancy-pages
cp assets/*.html                debian/usr/share/apache-fancy-pages
cp -R assets/error              debian/usr/share/apache-fancy-pages
cp conf/fancy-index.conf        debian/etc/apache2/conf-available
cp conf/fancy-index-tests.conf  debian/etc/apache2/conf-available
cp conf/fancy-error.conf        debian/etc/apache2/conf-available

# adjust ownerships
chown -R root:root              debian
chown -R root:root              debian/usr/share/apache-fancy-pages
chmod -R 0755                   debian/usr/share/apache-fancy-pages
chmod -R 0644                   debian/etc 

# finally build the package
dpkg-deb --build debian dist
