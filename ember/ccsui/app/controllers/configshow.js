export default Ember.Controller.extend({

    appName: 'Cisco Configsearch Appliance: Show Config',
    solrResponse: {},
    model: {params:{id: 'notset'}},
    config: "",
    id: "",


       /*
    init: function() {
        this.send("query");
        console.log('model', this.get('model'));
    },

    actions: {

       query: function() {

           var self = this;
           console.log('query', self.get('q'));
            
           var model = self.get('model');
           var id =  model.params.id;

           var qData = {};
           qData.q = 'id:"'+id+'"';


           $.ajax({
                url:    "http://localhost:8983/solr/configsearchcore/select?wt=json&fl=content",
                type: "GET",
                data: qData,
                dataType: 'json'
           }).then(function(response) {
              
                var config = response.response.docs[0].content;
                config = config.replace(/\n  /g, '\n&nbsp;&nbsp;');
                config = config.replace(/\n /g, '\n&nbsp;');
                config = config.replace(/(?:\r\n|\r|\n)/g, '<br />');
                self.set('solrResponse', response);
                self.set('config', config);
           });
       }
    }
    */
});
