App.Models.User = Backbone.Model.extend({
  urlRoot: "/users",
  defaults: {
  //  user: {
      "username"              : "",
      "email"                 : "",
      "password"              : "",
      "password_confirmation" : "",
      "latitude"              : "",
      "longitude"             : "",
      "active"                : "false"
   // }
  },
  initialize: function(){
    user = this;
  },
  geoLocate: function(){
    //start watching position after initialization
    if  (navigator.geolocation) {
      // timeout if value new location in 10 seconds
      var timeoutVal = 10 * 1000;

      // set location watch
      this.watchID = navigator.geolocation.watchPosition(
        user.watchPositionCallback,
        user.watchPostionError,
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: timeoutVal
        });

    } else {
      alert("geolocation not available")
    }
  },
  watchPositionCallback: function(position){
    // if geo successful, update lat/long and add a listener
    user.set("latitude", position.coords.latitude);
    user.set("longitude", position.coords.longitude);
// !!! BUG - SEEMS TO UPDATE ALL USERS !!!
    user.listenTo(user, "change", user.updateLatLon());
  },
  watchPositionError: function(error) {
    // if geo unsuccessful...
    var errors = {
      1: 'Permission denied',
      2: 'Position unavailable',
      3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
  },
  updateLatLon: function() {
    // Update users Lat/Lon
    //this.save({latitude: this.get("latitude"), longitude: this.get("longitude")}, {
    this.save(this.model, {
      wait: true,
      success: function(model, response){
        // User updated successfully
        console.log("User updated success");
      },
      error: function(model, error){
        console.log("Cannot update user");
      }
    });
  },
  // attrs is model attributes
  // options are what's passed from save or set
  validate: function(attrs, options){
    var errors = [];
    debugger;
    //if (attrs.user.username === "" || attrs.user.email === "" || attrs.user.password === "" || attrs.user.password_confirmation === ""){
    // if (attrs.username === "" || attrs.email === "" || attrs.password === "" || attrs.password_confirmation === ""){
    //   errors.push("Fields can't be Blank!");
    // }
    // if (attrs.user.password !== attrs.user.password_confirmation) {
    //   errors.push("Passwords must match");
    // }
    // if(errors.length > 0) {
    //   return errors;
    // }
  },
  authenticate: function(){
    // authenticate user with login fields
    var user = this;
    $.ajax({
      url   : "/login",
      async : false,
      type  : "post",
      data  : {
        username: this.get('username'),
        password: this.get('password')
      }
    }).done(function(response){
      user.set(response);
      return true;
    });
  }
});