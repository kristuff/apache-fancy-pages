# apache-fancy-pages

> Modern drop in replacement for default Apache index/error pages. 

```
  ___                  ___
 | __|_ _ _ _  __ _  _| _ \__ _ __ _ ___ ___
 | _/ _` | ' \/ _| || |  _/ _` / _` / -_|_-<
 |_|\__,_|_||_\__|\_, |_| \__,_\__, \___/__/
                  |__/         |___/
 
```

![preview_dark](/screenshots/after_dark.png)
![preview_401](/screenshots/401_dark.png)


## Features
- Responsive design
- Breadcrumb navigation
- Search/Filter results
- Light/Dark theme based on user prefered color scheme  
- Replacement for default error pages: 401, 403, 404, 500

## Requirements
- Apache >= 2.4 


## Install

### Debian based server

-   Install package:

    Packages (`.deb`) are available on [packages.kristuff.fr/debian/](https://packages.kristuff.fr/debian/). You can configure `apt` to connect kristuff repository (see instructions here: [packages.kristuff.fr/](https://packages.kristuff.fr/)) and install it: 

    ```.language-bash
    apt-get update
    apt-get install apache-fancy-pages
    ```
    
    Alternatively, you can download the latest `.deb` package from release tags and install it using `dpkg -i`:

-   Enable fancy-index conf:

    The `fancy-index.conf` contains an alias for url `/fancy-pages` to serve template, style, script and icons files. Enable this conf to set *fancy-index* enabled everywhere `Options Indexes` is enabled.
    
    ```
    a2enconf fancy-index
    systemctl reload apache2
    ```

    Voila! 


-   Setup fancy-index tests:
    
    You can enable the `fancy-index-tests` conf to test index with fake content. The `tests` directory contain empty files with various extensions. 

    ```
    a2enconf fancy-index-tests
    systemctl reload apache2
    ```

    `Tests` directory is then available to the following url: `EXAMPLE.COM/fancy-index-tests/`.


-   Enable fancy-error conf:

    The `fancy-error.conf` contains an alias for url `/fancy-error` to serve templates on error and prevent them to be directly requested. 
    
    ```
    a2enconf fancy-error
    systemctl reload apache2
    ```

    Voila! 


### Other distros/manual install

1.  Clone this repo on github (could be ***not*** up to date with the latest build).

2.  Copy content of the folder `/assets/` to `/usr/share/apache-fancy-pages`. Adjust permissions to be readable by web server. 

3.  Copy the files in `/conf/` to apache conf available directory (in debian `/etc/apache2/conf-available`)

4.  Enable conf and restart Apache. 


