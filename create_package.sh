#!/bin/sh

#  ___                  ___         _
# | __|_ _ _ _  __ _  _|_ _|_ _  __| |_____ __
# | _/ _` | ' \/ _| || || || ' \/ _` / -_) \ /
# |_|\__,_|_||_\__|\_, |___|_||_\__,_\___/_\_\
#                  |__/
# 
# This file is part of kristuff/apache-fancy-index.
# Version 0.1.3
# Copyright (c) 2021 Kristuff <kristuff@kristuff.fr>
#
# For the full copyright and license information, please view the LICENSE
# file that was distributed with this source code.


# our dist directory
mkdir -p dist

# create a clean debian package directory
rm -rf debian
mkdir -p debian/DEBIAN
mkdir -p debian/usr/share/apache-fancy-index
mkdir -p debian/usr/share/doc/apache-fancy-index
mkdir -p debian/etc/apache2/conf-available

# populate the debian directory
cp deb/control              debian/DEBIAN
cp deb/copyright            debian/usr/share/doc/apache-fancy-index
cp -R tests                 debian/usr/share/doc/apache-fancy-index
# cp deb/postinst.sh          debian/DEBIAN/postinst
# cp deb/postrm.sh            debian/DEBIAN/postrm
# cp deb/prerm.sh             debian/DEBIAN/prerm
cp template/HEADER.html     debian/usr/share/apache-fancy-index
cp template/FOOTER.html     debian/usr/share/apache-fancy-index
cp -R assets/css            debian/usr/share/apache-fancy-index
cp -R assets/js             debian/usr/share/apache-fancy-index
cp -R assets/icons          debian/usr/share/apache-fancy-index
cp conf/fancy-index.conf        debian/etc/apache2/conf-available
cp conf/fancy-index-tests.conf  debian/etc/apache2/conf-available

# adjust ownerships
chown -R root:root          debian
chown -R root:www-data      debian/usr/share/apache-fancy-index
chmod -R 0750               debian/usr/share/apache-fancy-index
chmod -R 0644               debian/etc 

# minimal permissions required for scripts
#chmod 755 debian/DEBIAN/postinst
#chmod 755 debian/DEBIAN/prerm
#chmod 755 debian/DEBIAN/postrm

# finally build the package
dpkg-deb --build debian dist
