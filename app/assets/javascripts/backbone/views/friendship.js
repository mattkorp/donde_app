App.Views.Friendships = Backbone.View.extend({
  el: "#friendships-list",
  events: {
    "submit form"           : "newFriend",
    "click a.friend-anchor" : "chooseFriend"
  },
  initialize: function(args) {
    this.render();
  },
  show: function() {
    this.$el.show("slow");
  },
  render: function(){
    this.friends       = new App.Models.Friendship();
    this.friendships   = new App.Collections.Friendships({model: this.friends});
    var myFriends      = this.friendships;
    var friendView     = this;
    this.friendships.fetch({
      success: function(model) {
        var template = HandlebarsTemplates['friendships/friendships']({ friendships: myFriends.toJSON()});
      console.log(myFriends.toJSON());
        friendView.$el.html( template );
      }
    });

  },
  newFriend: function(e) {
    // create model for new user, get email from input
    e.preventDefault();
    var newUser = new App.Models.Friendship();
    newUser.set( this.getAttributes() );
    // add user to contacts
    // TODO
  },
  getAttributes: function() {
    return {
      email: this.email.val(),
    }
  },
  chooseFriend: function(e) {
    // TODO add friend id or username to the string
    this.$el.hide("slow");
    $('div.spinner').show();
    App.router.navigate( "where", { trigger: true });
  }
});

