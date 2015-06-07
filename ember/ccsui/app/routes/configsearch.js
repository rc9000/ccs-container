export default Ember.Route.extend({
  setupController: function(controller) {
    controller.set('title', "some crap set in router");
  }
});
