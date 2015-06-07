#!/bin/bash

# delete all documents and load the testdata
CORE_URL=http://localhost:8983/solr/configsearchcore
curl $CORE_URL/update --data '<delete><query>*:*</query></delete>' -H 'Content-type:text/xml; charset=utf-8'
curl $CORE_URL/update --data '<commit/>' -H 'Content-type:text/xml; charset=utf-8'

# load testdata
$CCS/solr/bin/post -c configsearchcore  testdata/*.xml

echo 
echo
echo "now running tests...."

jasmine-node spec
