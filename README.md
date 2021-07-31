# apache-fancy-index

> A responsive Apache index page. 

```
  ___                  ___         _
 | __|_ _ _ _  __ _  _|_ _|_ _  __| |_____ __
 | _/ _` | ' \/ _| || || || ' \/ _` / -_) \ /
 |_|\__,_|_||_\__|\_, |___|_||_\__,_\___/_\_\
                  |__/

```

## Requirements
- Apache >= 2.4 


## Install

-   **Debian based sever**:

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

-   **Other distros**:

    