Trips = new Mongo.Collection("trips");
// trips database collection

Trips.allow({
  insert: function(userId, doc) {
    return !!userId; //if userId exists
  },
  update: function(userId, doc) {
    return !!userId; //if userId exists
  },
});

TripSchema = new SimpleSchema({
  name: {
    type: String,
    optional: true,
    label: "Name"
  },
  tripOwner: {
    type: String,
    label: "Owner",
    autoValue: function() {
      return this.userId
    },
    autoform: {
      type: "hidden"
    }
  },
  odoStart: {
    type: Number,
    optional: true,
    label: "Odometer Start"
  },
  odoEnd: {
    type: Number,
    optional: true,
    label: "Odometer End"
  },
  localityStart: {
    type: String,
    optional: true,
    label: "Start Location"
  },
  localityEnd: {
    type: String,
    optional: true,
    label: "End Location"
  },
  lngStart: {
    type: Number,
    optional: true,
    min: -180.0,
    max: 180.0,
    decimal: true,
    autoform: {
      type: "hidden"
    }
  },
  latStart: {
    type: Number,
    optional: true,
    min: -90.0,
    max: 90.0,
    decimal: true,
    autoform: {
      type: "hidden"
    }
  },
  lngEnd: {
    type: Number,
    optional: true,
    min: -180.0,
    max: 180.0,
    decimal: true,
    autoform: {
      type: "hidden"
    }
  },
  latEnd: {
    type: Number,
    optional: true,
    min: -90.0,
    max: 90.0,
    decimal: true,
    autoform: {
      type: "hidden"
    }
  },
  commentStart: {
    type: String,
    optional: true,
    label: "Start Comment"
  },
  commentEnd: {
    type: String,
    optional: true,
    label: "End Comment"
  },
  dateStart: {
    type: Date,
    label: "Start Date",
    optional: true,
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden"
    }
  },
  dateEnd: {
    type: Date,
    label: "Start Date",
    optional: true,
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden"
    }
  },
  tripFinished: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  }
});

Trips.attachSchema(TripSchema);
