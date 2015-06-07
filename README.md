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

It comes with the following components:

 * fully configured Solr fulltext search engine with a an optimized schema for config files
 * a configuration parser to transform the config files from plain text into a hierarchical XML document
 * a simple web application to explore the indexed content
 * everything is neatly wrapped up in a Docker image
 

This is currently a work in progress, check back later for instructions etc.
 
 
