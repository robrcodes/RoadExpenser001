// these publish rules ensure only data belonging to a user is able to be accessed by the user from the client/browser

Meteor.publish('trips', function() {
  return Trips.find({tripOwner: this.userId});
});

Meteor.publish('expenses', function() {
  return Expenses.find({owner: this.userId});
});
