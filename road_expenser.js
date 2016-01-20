if (Meteor.isClient) {
  // set initial client side session variables
  Session.setDefault('myPage', "Home");
  Session.setDefault('myAdd', "Unknown");

  // **************************************************************************
  //   Helpers and Events : addExpenseLayout

  Template.addExpenseLayout.helpers({
    geoAddExp: function() {
      return Session.get('myAdd');
    },
    geoLatExp: function() {
      return Session.get('myLat');
    },
    geoLngExp: function() {
      return Session.get('myLng');
    },
    expCategory: function() {
      return [{
        label: "Fuel",
        value: "fuel"
      }, {
        label: "Other",
        value: "other"
      }];
    }
  });

  Template.addExpenseLayout.events({
    'submit': function(e) {
      FlowRouter.go('home', {
        _id: this.docId
      });
    },
    'click .setGeo': function(e) {
      handleGeoDetails(e);
    }
  });


  // **************************************************************************
  //   Helpers and Events : displayTripReport



  Template.displayTripReport.helpers({
    expenses: function() {
      var oneTrip_id = Session.get('oneTrip');
      return Expenses.find({
        tripId: oneTrip_id
      });
    },
    theTrip: function() {
      var oneTrip_id = Session.get('oneTrip');
      var item = Trips.findOne({
        _id: oneTrip_id
      });
      return item.name;
    },
    tripName: function() {
      var oneTrip_id = Session.get('oneTrip');
      var item = Trips.findOne({
        _id: oneTrip_id
      });
      if (typeof item == 'undefined') {
        return null;
      } else {
        return item.name;
      }
    },
    distTotal: function() {
      // Get _id for current trip
      var id = Session.get('oneTrip');
      // Get current trip document
      var mytrip = Trips.findOne(id);
      // Convert the trip start odometer reading to Number
      var myOdo = Number(mytrip.odoStart);
      // Get all documents from Expenses collection matching current trip _id
      var expodos = Expenses.find({
        tripId: id
      }, {
        sort: {
          odometer: 1
        }
      }).fetch();
      var totalDist = 0;
      if (expodos === 'undefined' || expodos.length == 0) {
        return totalDist;
      } else {
        // check for expenses latest document containing odometer value / current trip
        if (expodos[(expodos.length - 1)].odometer) {
          // Get and convert the latest odometer value to Number
          var lastOdo = Number(_.last(expodos).odometer);
          // Calculate total distance
          totalDist = lastOdo - myOdo;
        }
        // send total distance back for use in template {{distTotal}}
        return totalDist;
      }
    },
    fuelTotal: function() {
      // Get _id for current trip
      var id = Session.get('oneTrip');
      // Get all documents from Expenses collection matching current trip _id
      var expodosf = Expenses.find({
        tripId: id,
        category: 'fuel'
      }).fetch();
      var totalFuel = 0;
      var totalFuel = _.reduce(expodosf, (function(s, r) {
        if (!isNaN(r.value)) {
          return s + Number(r.value);
        } else {
          return s;
        }
      }), 0);
      return totalFuel.toFixed(2);
    },
    otherTotal: function() {
      // Get _id for current trip
      var id = Session.get('oneTrip');
      // Get all documents from Expenses collection matching current trip _id
      var expodoso = Expenses.find({
        tripId: id,
        category: {
          $ne: 'fuel'
        }
      }).fetch();
      var totalOther = 0;
      if (expodoso === 'undefined' || expodoso.length == 0) {
        return totalOther;
      } else {
        var totalOther = _.reduce(expodoso, (function(s, r) {
          if (!isNaN(r.value)) {
            return s + Number(r.value);
          } else {
            return s;
          }
        }), 0);
        return totalOther.toFixed(2);
      }
    },
    tripTotal: function() {
      // Get _id for current trip
      var id = Session.get('oneTrip');
      // Get all documents from Expenses collection matching current trip _id
      var expodoso = Expenses.find({
        tripId: id
      }).fetch();
      var totalTrip = 0;
      var totalTrip = _.reduce(expodoso, (function(s, r) {
        if (!isNaN(r.value)) {
          return s + Number(r.value);
        } else {
          return s;
        }
      }), 0);
      return totalTrip.toFixed(2);
    }
  });

  Template.displayTripReport.events({
    'click .returnToList': function(e) {
      // Prevent default browser form submit
      e.preventDefault();
      Session.set('myPage', "Reports");
      // Session.set('oneTrip', null);
      FlowRouter.go('viewreports');
    },
    'click .exportTrip': function(e) {
      // Prevent default button behaviour
      e.preventDefault();
      var id = Session.get('oneTrip');
      MyAppExporter.exportTrip(id);
      MyAppExporter.exportAllExpenses(id);
    }
  });


  // **************************************************************************
  //   Helpers and Events : editLastExpenseLayout

  Template.editLastExpenseLayout.helpers({
    geoAddExp: function() {
      return Session.get('myAdd');
    },
    geoLatExp: function() {
      return Session.get('myLat');
    },
    geoLngExp: function() {
      return Session.get('myLng');
    },
    expCategory: function() {
      return [{
        label: "Fuel",
        value: "fuel"
      }, {
        label: "Other",
        value: "other"
      }];
    },
    tripName: function() {
      var item = Trips.findOne({
        tripFinished: false
      });
      if (typeof item == 'undefined') {
        return null;
      } else {
        return item.name;
      }
    },
    thisExpense: function() {
      var nowTrip = Session.get('currTrip');
      var item = Expenses.find({
        tripId: nowTrip
      }, {
        sort: {
          createdAt: -1
        }
      }).fetch();
      var result = item[0]._id;
      Session.set('blah', result);
      item = Expenses.findOne({
        _id: result
      });
      return item;
    }
  });

  Template.editLastExpenseLayout.events({
    'submit': function(e) {
      FlowRouter.go('home', {
        _id: this.docId
      });
    },
    'click .glyphicon-home': function(e) {
      // Prevent default browser form submit
      e.preventDefault();
      FlowRouter.go('home');
    },
    'submit': function(e) {
      FlowRouter.go('home', {
        _id: this.docId
      });
    },
    'click .setGeo': function(e) {
      handleGeoDetails(e);
    }
  });


  // **************************************************************************
  // End Current Trip Helpers and Events

  Template.endCurrentLayout.helpers({
    tripName: function() {
      var item = Trips.findOne({
        tripFinished: false
      });
      if (typeof item == 'undefined') {
        return null;
      } else {
        return item.name;
      }
    },
    thisTrip: function() {
      return Trips.findOne({
        tripFinished: false
      });
    },
    geoAdd: function() {
      return Session.get('myAdd');
    },
    geoLatExp: function() {
      return Session.get('myLat');
    },
    geoLngExp: function() {
      return Session.get('myLng');
    }
  });


  Template.endCurrentLayout.events({
    'submit': function(e) {
      FlowRouter.go('home', {
        _id: this.docId
      });
    },
    'click .glyphicon-home': function(e) {
      // Prevent default browser form submit
      e.preventDefault();
      FlowRouter.go('home');
    },
    'click .setGeo': function(e) {
      handleGeoDetails(e);
    }

  });





  // **************************************************************************
  //   Helpers and Events : expense

  Template.expense.helpers({
    // format the date for improved display in table
    createdAtFormatted: function() {
      return moment(this.createdAt).format('DD/MM/YYYY');
    },
    shortAddress: function() {
      var item = this.locality;
      var item2 = item.split(',');
      // shorten address to only display first 15 characters
      return item2[0].substring(0, 14) + '...';
    }
  });

  // **************************************************************************
  //   Helpers and Events : homeLayout

  Template.homeLayout.helpers({
    isTrip: function() {
      var item = Trips.findOne({
        tripFinished: false
      });
      if (typeof item == 'undefined') {
        Session.set('currTrip', null);
        return null;
      } else {
        // Session.set('currTrip',null);
        Session.set('currTrip', item._id);
        return item;
      }
    },
    tripName: function() {
      var item = Trips.findOne({
        tripFinished: false
      });
      if (typeof item == 'undefined') {
        return null;
      } else {
        return item.name;
      }
    },
    distTotal: function() {
      // Get _id for current trip
      var id = Session.get('currTrip');
      // Get current trip document
      var mytrip = Trips.findOne(id);
      // Convert the trip start odometer reading to Number
      var myOdo = Number(mytrip.odoStart);
      // Get all documents from Expenses collection matching current trip _id
      var expodos = Expenses.find({
        tripId: id
      }, {
        sort: {
          odometer: 1
        }
      }).fetch();
      var totalDist = 0;

      if (expodos === 'undefined' || expodos.length == 0) {
        return totalDist;
      } else {
        if (expodos[(expodos.length - 1)].odometer) {
          // Get and convert the latest odometer value to Number
          var lastOdo = Number(_.last(expodos).odometer);
          // Calculate total distance
          totalDist = lastOdo - myOdo;
        }
        // send total distance back for use in template {{distTotal}}
        return totalDist;
      }
    },
    fuelTotal: function() {
      // Get _id for current trip
      var id = Session.get('currTrip');
      // Get all documents from Expenses collection matching current trip _id
      var expodosf = Expenses.find({
        tripId: id,
        category: 'fuel'
      }).fetch();
      var totalFuel = 0;
      var totalFuel = _.reduce(expodosf, (function(s, r) {
        if (!isNaN(r.value)) {
          return s + Number(r.value);
        } else {
          return s;
        }
      }), 0);
      return totalFuel.toFixed(2);
    },
    otherTotal: function() {
      // Get _id for current trip
      var id = Session.get('currTrip');
      // Get all documents from Expenses collection matching current trip _id
      var expodoso = Expenses.find({
        tripId: id,
        category: {
          $ne: 'fuel'
        }
      }).fetch();
      var totalOther = 0;
      if (expodoso === 'undefined' || expodoso.length == 0) {
        return totalOther;
      } else {
        var totalOther = _.reduce(expodoso, (function(s, r) {
          if (!isNaN(r.value)) {
            return s + Number(r.value);
          } else {
            return s;
          }
        }), 0);
        return totalOther.toFixed(2);
      }

    },
    tripTotal: function() {
      // Get _id for current trip
      var id = Session.get('currTrip');
      // Get all documents from Expenses collection matching current trip _id
      var expodoso = Expenses.find({
        tripId: id
      }).fetch();
      var totalTrip = 0;
      var totalTrip = _.reduce(expodoso, (function(s, r) {
        if (!isNaN(r.value)) {
          return s + Number(r.value);
        } else {
          return s;
        }
      }), 0);
      return totalTrip.toFixed(2);
    }
  });


  Template.homeLayout.events({
    'click .glyphicon-cog': function(e) {
      // Prevent default browser form submit
      e.preventDefault();
      Session.set('myPage', "Settings");
      FlowRouter.go('settings');
    },
    'click .createNewTrip': function(e) {
      // Prevent default browser form submit
      e.preventDefault();
      Session.set('myPage', "New Trip");
      FlowRouter.go('newTrip');
    },
    'click .addExpense': function(e) {
      // Prevent default browser form submit
      e.preventDefault();
      Session.set('myPage', "Add Expense");
      FlowRouter.go('addexpense');
    },
    'click .viewReports': function(e) {
      // Prevent default browser form submit
      e.preventDefault();
      Session.set('myPage', "Reports");
      FlowRouter.go('viewreports');
    }
  });


  // *************************************************************************
  //   Helpers and Events : mainLayout

  Template.mainLayout.helpers({
    pageTitle: function() {
      return Session.get('myPage');
    }
  });

  Template.mainLayout.events({
    'click .glyphicon-home': function(e) {
      // Prevent default browser form submit
      e.preventDefault();
      Session.set('myPage', "Home");
      FlowRouter.go('home');
    }
  });

  // ************************************************************************
  //   Helpers and Events : mytripsTemplate - mytrip

  Template.mytrip.events({
    'click .view-trip': function() {
      Session.set('oneTrip', this._id);
      Session.set('myPage', "View Trip");
      FlowRouter.go('displaytrip');
    }
  });


  // **************************************************************************
  //   Helpers and Events :  newTripLayout

  Template.newTripLayout.helpers({
    geoAdd: function() {
      return Session.get('myAdd');
    },
    geoLatTrip: function() {
      return Session.get('myLat');
    },
    geoLngTrip: function() {
      return Session.get('myLng');
    },
    tripName: function() {
      var item = Trips.findOne({
        tripFinished: false
      });
      if (typeof item == 'undefined') {
        return null;
      } else {
        //return item.name;
        Session.set('currTrip', item._id);
      }
    }
  });

  Template.newTripLayout.events({
    'submit': function(e) {
      FlowRouter.go('home');
    },
    'click .setGeo': function(e) {
      handleGeoDetails(e);
    }
  });

  // *************************************************************************
  //   Helpers and Events : settingsLayout

  Template.settingsLayout.helpers({
    isTrip: function() {
      var item = Trips.findOne({
        tripFinished: false
      });
      if (typeof item == 'undefined') {
        Session.set('currTrip', null);
        return null;
      } else {
        // Session.set('currTrip',null);
        Session.set('currTrip', item._id);
        return item;
      }
    }
  });


  Template.settingsLayout.events({
    'click .endCurrentTrip': function(e) {
      // Prevent default browser form submit
      e.preventDefault();
      Session.set('myPage', "End Trip");
      FlowRouter.go('endtrip');
    },
    'click .edit-last-expense': function(e) {
      // Prevent default browser form submit
      e.preventDefault();
      Session.set('myPage', "Edit Expense");
      FlowRouter.go('editlastexpense');
    },
    'click .glyphicon-home': function(e) {
      // Prevent default browser form submit
      e.preventDefault();
      Session.set('myPage', "Home");
      FlowRouter.go('home');
    },
    'click .login-buttons-logout': function(e) {
      FlowRouter.go('home');
    },
    'click .returnhome': function(e) {
      FlowRouter.go('home');
    }
  });

  // Below disables the accounts-ui dropdown link behaviour on form
  Template.settingsLayout.rendered = function() {
    Accounts._loginButtonsSession.set('dropdownVisible', true);
  };

  Template.homeLayout.rendered = function() {
    Accounts._loginButtonsSession.set('dropdownVisible', true);
  };


  // *************************************************************************
  //   Helpers and Events : viewReportsLayout

  Template.viewReportsLayout.helpers({
    mytrips: function() {
      // return all docs in reverse natural order, latest first
      return Trips.find({}, {
        sort: {
          '_id': -1
        }
      });;
    }
  });

  Template.viewReportsLayout.events({
    'click .glyphicon-home': function(e) {
      // Prevent default browser form submit
      e.preventDefault();
      FlowRouter.go('home');
    }
  });

  // This is the function to make use of the GeoLocation API to
  // retrieve the latitude and longitude values (approximate),
  // then makes use of the Google maps API to return locality
  // data which is shortened and returned to the calling helper,
  // then passed via session variables to the client elements.
  
  function handleGeoDetails(e) {
    e.preventDefault();
    Session.set('myAdd', "Searching for Location...");
    geocoder = new google.maps.Geocoder();

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      Session.set('myAdd', "No Location Found");
    }

    function shortAddress(str) {
      // return address without the first (street) component
      var x = str.split(',');
      x.shift();
      y = x.join(', ');
      return y;
    }

    function codeLatLng(lat, lng) {
      var latlng = new google.maps.LatLng(lat, lng);
      console.log(latlng);
      geocoder.geocode({
        'latLng': latlng
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results)
          if (results[1]) {
            //formatted address
            shortAdd = shortAddress(results[0].formatted_address);
            Session.set('myAdd', shortAdd);
          } else {
            console.log("No results found");
            Session.set('myAdd', 'No Results found');
          }
        } else {
          console.log("Geocoder failed due to: " + status);
          Session.set('myAdd', 'Geocoder failed');
        }
      });
    }

    function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      Session.set('myLat', latitude);
      Session.set('myLng', longitude);
      // find address
      codeLatLng(latitude, longitude);
    };

    function error() {
      console.log("Unable to retrieve your location");
    };

    // main call to geolocation API via browser/device
    navigator.geolocation.getCurrentPosition(success, error);
  } // end of click handleGeoDetails event


} // End of isClient
// **************************************************************************

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
    // "Logout"-Hook: Manual implementation
    Tracker.autorun(function() {
      var userId = this.userId;
      if (!userId) {
        FlowRouter.go('/'); // go 'home' on logout
      }
    });

  });
}

// methods available to be called
Meteor.methods({
  getLatestExpense: function(tripid) {
    var item = Expenses.find({
      tripid: tripid
    }).sort({
      _id: -1
    }).limit(1);

    if (item.owner !== Meteor.userId()) {
      throw new Meteor.Error('not authorised');
    }
    return item;
  }

}); // End of Meteor Methods
