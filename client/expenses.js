Meteor.subscribe('expenses', function(){
  return Expenses.find({owner: this.userId});
});
  // only current user expenses will be returned
