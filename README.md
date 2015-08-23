# ccs-container
Cisco Config Search Appliance (Docker Image) based on Apache Solr

## Overview
ccs-container is a ready-to-use Docker image to index and search the configurations of a Cisco-based enterprise (or home) network. 

It provides this user interface:

![Screenshot](https://raw.githubusercontent.com/rc9000/ccs-container/master/doc/img/screenshot.png "Screenshot")

What's the point of this and what does it differently from `grep` and `| include`? 

 * the index is hierachical, so you can search for configuration items only in e.g. interfaces 
 * it has shiny colors (well, at least one, yellow) and does not require any knowledge of CLI tools
 * search your whole network in seconds from one single point of entry, no need to log into devices
 * [n-gram](https://en.wikipedia.org/wiki/N-gram)-based, allows using an index to find arbitrary fragments even inside of words 

## Online Demo

Depending on the hosting bill it is racking up, a demo might or might not be available at [ccs.kloud.networkz.ch:9900/configsearch](http://ccs.kloud.networkz.ch:9900/configsearch). Use *ccs/Django Reinhardt* to log in.

## How to install in your environment

 1. `docker pull rc9000/ccs-container`([dockerhub page](https://registry.hub.docker.com/u/rc9000/ccs-container/))<br>
 2. run the image with ports 9900 and 4222 mapped:<br> `docker run -d  -p 9900:9900 -p 4222:4222  rc9000/ccs-container`<br>
 3. scp your config files into the container, using *ccs_default_pw* as password:<br> `scp -P 4222 -l ccs *.conf <docker-ip>:/opt/ccs/configs`<br>How the config files are gathered is up to you, popular options are exports from Ciscoworks, Prime etc. or Open solutions like [rancid](http://www.shrubbery.net/rancid/) or [gerty](https://github.com/ssinyagin/gerty). If you don't have any config files at hand, a few examples will be automatically loaded on startup.<br>
 4. the files will automatically be indexed after a while, but to speed things up, you can ssh into the container and run `/opt/ccs/loader/loader.sh`<br>
 5. navigate browser to the frontend at `http://<docker-ip>:9900/configsearch`
 6. log in with these default credentials: username *ccs* and password *Django Reinhardt*
 

## Qs that might become FA

 1. *can I run this without docker?* Yes, just clone to a local directory on your target system and do the equivalent prerequisites listed in the Dockerfile. Confirmed to work on OS X and Linux.
 2. *why don't you integrate Rancid so it finds the config files on its own?* Great idea - pull requests are very welcome.
 3. *how can I change the web password?* Use the htpasswd utility on `/opt/ccs/httpd/etc/auth.txt`
 4. *how can I change the ssh password?* Login with ssh into the image, then use the passwd utility as usual.


 
