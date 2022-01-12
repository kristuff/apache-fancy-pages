% FANCY-INDEX-TESTS.CONF(5) Apache-fancy-pages User Manuals
% 
% Janury 12, 2022

# NAME

fancy-index-tests.conf - configuration file for apache-fancy-pages.

# SYNOPSIS

fancy-index-texts.conf

# DESCRIPTION

The **fancy-index-tests.conf** contains an alias for url */fancy-index-tests* designed to test **fancy-index.conf**. It exposes a directory containing empty files with various extensions. 

Enable this conf in addition to *fancy-index* to allow indexing on url */fancy-index-tests*.

~~~~~~~
a2enconf fancy-index
a2enconf fancy-index-tests
systemctl reload apache2
~~~~~~~

# BUGS

Submit bug reports online at: <https://github.com/kristuff/apache-fancy-pages/issues>

# SEE ALSO

Source code at: <https://github.com/kristuff/apache-fancy-pages>

Online documentation at: <https://kristuff.fr/projects/apache-fancy-pages/>

