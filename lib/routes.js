// This file contains the routing which managed url redirection,
// uses the FlowRouter package

FlowRouter.route('/', {
  name: 'home',
  action() {
    Session.set('myAdd', "Location Not Set");
    BlazeLayout.render('homeLayout');
  }
});

FlowRouter.route('/test', {
  name: 'test',
  action() {
    BlazeLayout.render('mainLayout', {
      main: 'Test'
    });
  }
});

FlowRouter.route('/settings', {
  name: 'settings',
  action() {
    BlazeLayout.render('mainLayout', {
      main: 'settingsLayout'
    });
  }
});

FlowRouter.route('/edit-last-expense', {
  name: 'editlastexpense',
  action() {
    BlazeLayout.render('mainLayout', {
      main: 'editLastExpenseLayout'
    });
  }
});

FlowRouter.route('/new-trip', {
  name: 'newTrip',
  action() {
    Session.set('myAdd', "Location Not Set");
    Session.set('myLat', "60");
    Session.set('myLng', "60");
    BlazeLayout.render('mainLayout', {
      main: 'newTripLayout'
    });
  }
});

FlowRouter.route('/add-expense', {
  name: 'addexpense',
  action() {
    Session.set('myAdd', "Location Not Set");
    Session.set('myLat', "60");
    Session.set('myLng', "60");
    BlazeLayout.render('mainLayout', {
      main: 'addExpenseLayout'
    });
  }
});

FlowRouter.route('/view-reports', {
  name: 'viewreports',
  action() {
    BlazeLayout.render('mainLayout', {
      main: 'viewReportsLayout'
    });
  }
});

FlowRouter.route('/display-trip', {
  name: 'displaytrip',
  action() {
    BlazeLayout.render('mainLayout', {
      main: 'displayTripReport'
    });
  }
});

FlowRouter.route('/end-trip', {
  name: 'endtrip',
  action() {
    Session.set('myAdd', "Location Not Set");
    Session.set('myLat', "60");
    Session.set('myLng', "60");
    BlazeLayout.render('mainLayout', {
      main: 'endCurrentLayout'
    });
  }
});
