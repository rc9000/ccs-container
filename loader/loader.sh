#!/bin/bash

export CCS=/opt/ccs

# delete all documents and load the newly generated xml files
CORE_URL=http://localhost:8983/solr/configsearchcore
curl $CORE_URL/update --data '<delete><query>*:*</query></delete>' -H 'Content-type:text/xml; charset=utf-8'
curl $CORE_URL/update --data '<commit/>' -H 'Content-type:text/xml; charset=utf-8'

$CCS/loader/loader.py '*.conf' 

$CCS/solr/bin/post -c configsearchcore  $CCS/xml/*.xml

