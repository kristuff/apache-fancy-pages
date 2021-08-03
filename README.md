# apache-fancy-index

> Modern drop in replacement for default Apache index page. 

```
  ___                  ___         _
 | __|_ _ _ _  __ _  _|_ _|_ _  __| |_____ __
 | _/ _` | ' \/ _| || || || ' \/ _` / -_) \ /
 |_|\__,_|_||_\__|\_, |___|_||_\__,_\___/_\_\
                  |__/

```

![preview_dark](/screenshots/after_dark.png)



## Features
- Responsive design
- Breadcrumb navigation
- Search/Filter results
- Light/Dark theme based on user prefered color scheme 

## Requirements
- Apache >= 2.4 


## Install

-   **Debian based server**:

    Packages are available on [packages.kristuff.fr/debian/](https://packages.kristuff.fr/debian/). You need first to configure apt using [debian instructions to connect to a third-party repository](https://wiki.debian.org/DebianRepository/UseThirdParty).
    
    -   Download and store the public key using curl (as root):

        ```
        curl https://packages.kristuff.fr/debian/kristuff@kristuff.fr.gpg.key | gpg --dearmor > /usr/share/keyrings/kristuff-archive-keyring.gpg
        ```

    -   Create a file `kristuff.list` in `/etc/apt/sources.list.d/` with the following content:

        ```
        deb [signed-by=/usr/share/keyrings/kristuff-archive-keyring.gpg] https://packages.kristuff.fr/debian/ buster main
        deb-src [signed-by=/usr/share/keyrings/kristuff-archive-keyring.gpg] https://packages.kristuff.fr/debian/ buster main
        ```

        > If you want to use a different name, make sure to use the same name in key file and source list file: `<name>-archive-keyring.gpg` + `/etc/apt/sources.list.d/<name>.list` 

    -   Install package:

        ```
        apt-get update
        apt-get install apache-fancy-index
        ```

    -   Enable fancy-index conf:

        ```
        a2enconf fancy-index
        systemctl reload apache2
        ```

        Voila! 

-   **Other distros**:

    TODO


## Setup tests directory

You can enable the `fancy-index-tests` conf to test index with fake content. The `tests` directory contain empty files with various extensions. 

```
a2enconf fancy-index-tests
systemctl reload apache2
```

`Tests` directory is then available to the following url: `YOUR.DOMAIN.COM/fancy-index-tests/`.
