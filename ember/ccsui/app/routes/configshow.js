export default Ember.Route.extend({
  setupController: function(controller, model) {
    console.log("model", model);
    controller.set('model', model);
  },

  model: function(params) {
    var model = {};
    console.log("params", params);

    var qData = {};
    qData.q = 'id:"'+params.id+'"';

    $.ajax({
         url:    "http://"+window.location.hostname+":9900/solr/configsearchcore/select?wt=json&fl=content",
         type: "GET",
         data: qData,
         async: false,
         dataType: 'json', 
         success: function(response) {
       
            var config = response.response.docs[0].content;
            config = config.replace(/\n  /g, '\n&nbsp;&nbsp;');
            config = config.replace(/\n /g, '\n&nbsp;');
            config = config.replace(/(?:\r\n|\r|\n)/g, '<br />');
            model.config = config;
            model.id = params.id;

         }
    });
    
    console.log("model", model);
    return model;
  }
});




