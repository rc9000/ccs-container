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

// TODO: although there are even 2 real matches, the highlighter returns more. We'd need to re-inspect hl results and remove entries
// that don't match the full q (because once the q with mm100% matched, additional trigrams will be matches as well
frisby.create('Test correct highlighting for 10.10.100.1')
  .get(coreUrl + '/select?q=content%3A10.10.100.1&fq=doctype%3A%22full+config%22+AND+id%3Aios-xr&wt=json&indent=true&debugQuery=true&defType=edismax&mm=100%25&hl=true&hl.fl=content&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E&hl.snippets=4')
  .expectStatus(200)
  .expectJSONLength('highlighting.ios-xr.content', 4)
.toss();






