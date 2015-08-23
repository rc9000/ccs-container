var frisby = require('frisby');
var coreUrl = "http://localhost:8983/solr/configsearchcore";


frisby.create('Find substring 101 in core2 (exactly 1 trigram')
  .get(coreUrl + '/select?q=content%3A101&fq=doctype%3A%22full+config%22&wt=json&indent=true&debugQuery=true&defType=edismax&mm=100%25')
  .expectStatus(200)
  .expectJSON({
    response: {
      numFound: 1
    }
  })
.toss();

frisby.create('Find substring description in some docs')
  .get(coreUrl + '/select?q=content%3Adescription&fq=doctype%3A%22full+config%22&wt=json&indent=true&debugQuery=true&defType=edismax&mm=100%25')
  .expectStatus(200)
  .expectJSON({
    response: {
      numFound: 3
    }
  })
.toss();

frisby.create('Find substring vlan 20 in core2')
  .get(coreUrl + '/select?q=content%3Avlan%5c+20&fq=doctype%3A%22full+config%22&wt=json&indent=true&debugQuery=true&defType=edismax&mm=100%25')
  .expectStatus(200)
  .expectJSON({
    response: {
      numFound: 1
    }
  })
.toss();






