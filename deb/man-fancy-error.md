% FANCY-ERROR.CONF(5) Apache-fancy-pages User Manuals
% 
% Janury 12, 2022

# NAME

fancy-error.conf - configuration file for apache-fancy-pages.

# SYNOPSIS

fancy-error.conf

# DESCRIPTION

The **fancy-error.conf** defines *ErrorDocument* to custom templates.

Enable this conf to serve custom default pages instead of default Apache pages. 

~~~~~~~
a2enconf fancy-error
systemctl reload apache2
~~~~~~~


# BUGS

Submit bug reports online at: <https://github.com/kristuff/apache-fancy-pages/issues>

# SEE ALSO

Source code at: <https://github.com/kristuff/apache-fancy-pages>

Online documentation at: <https://kristuff.fr/projects/apache-fancy-pages/>

