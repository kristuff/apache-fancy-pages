% FANCY-INDEX.CONF(5) Apache-fancy-pages User Manuals
% 
% Janury 12, 2022

# NAME

fancy-index.conf - configuration file for apache-fancy-pages.

# SYNOPSIS

fancy-index.conf

# DESCRIPTION

The **fancy-index.conf** contains an alias for url /fancy-pages to serve template, style, script and icons files. 

Enable this conf to set fancy-index enabled everywhere Options Indexes is enabled.

~~~~~~~
a2enconf fancy-index
systemctl reload apache2
~~~~~~~

# BUGS

Submit bug reports online at: <https://github.com/kristuff/apache-fancy-pages/issues>

# SEE ALSO

Source code at: <https://github.com/kristuff/apache-fancy-pages>

Online documentation at: <https://kristuff.fr/projects/apache-fancy-pages/>

