var frisby = require('frisby');
var coreUrl = "http://localhost:8983/solr/configsearchcore";

frisby.create('Get exact IP address (3 digit octet)')
  .get(coreUrl + '/select?q=content%3A255.255.255.254&fq=doctype%3A%22full+config%22&wt=json')
  .expectStatus(200)
  .expectJSON({
    response: {
      numFound: 2
    }
  })
.toss();

frisby.create('Get IP address substring')
  .get(coreUrl + '/select?q=content%3A255.255.255.254&fq=doctype%3A%22full+config%22&wt=json')
  .expectStatus(200)
  .expectJSON({
    response: {
      numFound: 2
    }
  })
.toss();

frisby.create('Get beginning of word')
  .get(coreUrl + '/select?q=content%3Aserial0&fq=doctype%3A%22full+config%22&wt=json')
  .expectStatus(200)
  .expectJSON({
    response: {
      numFound: 2
    }
  })
.toss();

frisby.create('Get exact match from content_wsonly')
  .get(coreUrl + '/select?q=content_wsonly%3Aserial0%2F0&fq=doctype%3A%22full+config%22&wt=json')
  .expectStatus(200)
  .expectJSON({
    response: {
      numFound: 2
    }
  })
.toss();


