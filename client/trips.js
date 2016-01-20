Meteor.subscribe('trips', function(){
  // only current user trips will be returned
  return Trips.find({tripOwner: this.userId});
});
