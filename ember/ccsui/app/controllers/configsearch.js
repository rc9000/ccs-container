import Ember from 'ember';

export default Ember.Controller.extend({

    appName: 'Cisco Configsearch Appliance',
    solrResponse: {},
    doctypes: ['interface', 'router', 'ip vrf', 'ip access-list', 'class-map', 'policy-map','full config'],
    selectedDoctype: 'full config',
    countString: "no results",
    exact: false,

    // some common queries, enabling here will autoload the result 
    //q: description should match descripiton but not encryption (mm=100% edismax ok?)
    //q: vlan 2 should give some results
    //q: 201 should match some configs and url texts
    q: "aaa new", 

    init: function() {
        this.send("query");
    },

    actions: {

       query: function() {

           var self = this;
           console.log('query', self.get('q'));

           var q = self.get("q");
           //q = q.replace(/ /g, '\\ '); // space needs escaping or edismax will break up q


           var qData = { 
               "defType": 'edismax',
               "q":  'content:"' + q + '"', 
               "mm": '100%',
               "hl": 'true',
               "hl.fl": 'content',
               "hl.snippets": 4,
               "hl.fragsize": 180,
               "hl.slop": 0.9,
               "hl.useFastVectorHighligter": 'true',
               "hl.boundaryScanner": 'breakIterator',
               "hl.fragmenter": 'regex',
               "hl.regex.pattern": '.*',   
               "hl.regex.slop": 0.99,
               "hl.regex.maxAnalyzedChars": 100000,
           };

           qData.fq = 'doctype:"'+self.get("selectedDoctype")+'"';

           $.ajax({
                url:    "http://"+window.location.hostname+":9900/solr/configsearchcore/select?"+
                        "wt=json&start=0&rows=100",
                type: "GET",
                data: qData,
                dataType: 'json'
           }).then(function(response) {

                console.log(qData);
              
                for (var i = 0 ; i <  response.response.docs.length ; i++) {
                    var doc = response.response.docs[i];

                    if (response.highlighting[doc.id][qData["hl.fl"]].length > 3){
                        doc.more = "further matches in this document...";
                        doc.snippets = response.highlighting[doc.id][qData["hl.fl"]];
                    }else{
                        doc.more = "";
                        doc.snippets = response.highlighting[doc.id][qData["hl.fl"]].slice(0,3);
                    }

                    doc.hl = response.highlighting[doc.id][qData["hl.fl"]].join("<hr class='hr'>");
                    doc.hl = doc.hl.replace(/\n  /g, '\n&nbsp;&nbsp;');
                    doc.hl = doc.hl.replace(/\n /g, '\n&nbsp;');
                    doc.hl = doc.hl.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    
                }

                if (response.response.numFound > 100){
                    self.set('countString', "showing first 100 of " + response.response.numFound + " results" );
                }else if (response.response.numFound === 0) {
                    self.set('countString', "no results" );
                }else{
                    self.set('countString', response.response.numFound + " results");
                }

                self.set('solrResponse', response);
           });
       }
    }
});
