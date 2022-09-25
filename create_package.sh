#!/bin/sh

#  ___                  ___
# | __|_ _ _ _  __ _  _| _ \__ _ __ _ ___ ___
# | _/ _` | ' \/ _| || |  _/ _` / _` / -_|_-<
# |_|\__,_|_||_\__|\_, |_| \__,_\__, \___/__/
#                  |__/         |___/
# 
# This file is part of kristuff/apache-fancy-pages.
# v0.2.1 - Copyright (c) 2021-2022 Kristuff <kristuff@kristuff.fr>
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
mkdir -p debian/usr/share/man/man5
mkdir -p debian/etc/apache2/conf-available

# populate the debian directory
cp deb/control                  debian/DEBIAN
cp deb/conffiles                debian/DEBIAN
cp deb/copyright                debian/usr/share/doc/apache-fancy-pages
cp deb/changelog                debian/usr/share/doc/apache-fancy-pages/changelog.Debian
gzip -9 -n                      debian/usr/share/doc/apache-fancy-pages/changelog.Debian  
cp deb/changelog                debian/usr/share/doc/apache-fancy-pages/changelog
gzip -9 -n                      debian/usr/share/doc/apache-fancy-pages/changelog  
cp -R tests                     debian/usr/share/doc/apache-fancy-pages

cp -R assets/css                debian/usr/share/apache-fancy-pages
cp -R assets/js                 debian/usr/share/apache-fancy-pages
cp -R assets/icons              debian/usr/share/apache-fancy-pages
cp assets/*.html                debian/usr/share/apache-fancy-pages
cp -R assets/error              debian/usr/share/apache-fancy-pages

cp conf/fancy-index.conf        debian/etc/apache2/conf-available
cp conf/fancy-index-tests.conf  debian/etc/apache2/conf-available
cp conf/fancy-error.conf        debian/etc/apache2/conf-available

# convert and deploy man page
/usr/bin/pandoc --standalone --to man deb/man-fancy-index.md -o debian/usr/share/man/man5/fancy-index.conf.5 
gzip -9 -n debian/usr/share/man/man5/fancy-index.conf.5 

/usr/bin/pandoc --standalone --to man deb/man-fancy-index-tests.md -o debian/usr/share/man/man5/fancy-index-tests.conf.5 
gzip -9 -n debian/usr/share/man/man5/fancy-index-tests.conf.5 

/usr/bin/pandoc --standalone --to man deb/man-fancy-error.md -o debian/usr/share/man/man5/fancy-error.conf.5 
gzip -9 -n debian/usr/share/man/man5/fancy-error.conf.5 

# adjust permissions
find debian -type d -exec chmod 0755 {} \;          #set directory attributes
find debian -type f -exec chmod 0644 {} \;          #set data file attributes

# finally build the package
dpkg-deb --root-owner-group --build debian dist
