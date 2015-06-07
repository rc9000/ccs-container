# ccs-container
Cisco Config Search Appliance based on Apache Solr

## Overview
ccs-container is a ready-to-use appliance to index and search the configurations of a Cisco-based enterprise (or home) network. 

It provides this user interface:

![Screenshot](https://raw.githubusercontent.com/rc9000/ccs-container/master/doc/img/screenshot.png "Screenshot")

What's the point of this and what does it differently from `grep` and `| include`? 

 * the index is hierachical, so you can search for configuration items only in e.g. interfaces 
 * the *don't match substring* option allows to control wether `192.168.1.2` will turn up results for `192.168.1.{20-29,200-255}` or not
 * it has shiny colors (well, at least one, yellow) and does not require any knowledge of CLI tools
 * search your whole network in seconds from one single point of entry, no need to log into devices

## How to use

 1. `docker pull rc9000/ccs-container`([dockerhub page](https://registry.hub.docker.com/u/rc9000/ccs-container/))
 2. run the image, e.g. like this in the foreground and with explicit port mapping: `docker run --publish-all=true -p 4200:4200 -p 4222:4222 -p 8983:8983 -i -t rc9000/ccs-container`
 3. scp your config files into the container, using *ccs_default_pw* as password: `scp -P 4222 -l ccs *.conf <docker-ip>:/opt/ccs/configs`
 4. the files will automatically be indexed after a while, but to speed things up, you can ssh into the container and run `/opt/ccs/loader/loader.sh`
 5. navigate browser to the frontend at `http://<docker-ip>:4200/configsearch`
 


## Internals

 * fully configured Solr fulltext search engine with a an optimized schema for config files
 * a configuration parser to transform the config files from plain text into a hierarchical XML document
 * a simple web application to explore the indexed content
 * everything is neatly wrapped up in a Docker image
 

 
 
