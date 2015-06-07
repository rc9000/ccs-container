export default Ember.Controller.extend({

    appName: 'Cisco Configsearch Appliance',
    solrResponse: {},
    doctypes: ['interface', 'router', 'ip vrf', 'ip access-list', 'class-map', 'policy-map','full config'],
    selectedDoctype: 'full config',
    countString: "no results",
    exact: false,

    // some common queries, enabling here will autoload the result 
    //q: "172.18.195.5", 
    //q: "0/5", 
    //q: "fastethernet0/2", 
    q: "", 

    init: function() {
        this.send("query");
    },

    actions: {

       query: function() {

           var self = this;
           console.log('query', self.get('q'));

           var q = self.get("q");
           var exact = self.get("exact");
           var qData = { "q": "content:" + q +  " or content_rev:" + q, "hl.fl": 'content'};

           if (exact){
                console.log("using content_wsonly");
                qData = { "q": "content_wsonly:" + q, "hl.fl": 'content_wsonly'};
                  
           } 


           qData.fq = 'doctype:"'+self.get("selectedDoctype")+'"';

           $.ajax({
                url:    "http://"+window.location.hostname+":8983/solr/configsearchcore/select?"+
                        "fq=doctype%3A%22full+config%22&wt=json&start=0&rows=100&"+
                        "hl=true&hl.snippets=4&hl.alternateField=content&hl.maxAlternateFieldLength=100",
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
                }else if (response.response.numFound == 0) {
                    self.set('countString', "no results" );
                }else{
                    self.set('countString', response.response.numFound + " results");
                }

                self.set('solrResponse', response);
           });
       }
    }
});
