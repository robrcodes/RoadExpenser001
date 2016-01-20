Expenses = new Mongo.Collection('expenses');
// this is the expenses database collection

// who is allowed to access insert function,
// this rule says if you are logged in
Expenses.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  }
});

// schema defined to aid autovalidation and autoform form creation
ExpenseSchema = new SimpleSchema({
  category: {
    type: String,
    label: "Category",
    autoform: {
      options: [
        {label: "Fuel", value: "fuel"},
        {label: "Meal", value: "meal"},
        {label: "Snacks", value: "snacks"},
        {label: "Toll", value: "toll"},
        {label: "Accommodation", value: "accommodation"},
        {label: "Gifts", value: "gifts"},
        {label: "Auto / Repairs", value: "auto"},
        {label: "Entertainment", value: "entertainment"},
        {label: "Medical", value: "medical"},
        {label: "Clothing", value: "Clothing"}
      ]
    }
  },
  expenseType: {
    type: String,
    optional: true,
    label: "Expense"
  },
  odometer: {
    type: Number,
    optional: true,
    label: "Odometer"
  },
  locality: {
    type: String,
    optional: true,
    label: "Location"
  },
  value: {
    type: Number,
    label: "Amount",
    decimal: true
  },
  comment: {
    type: String,
    optional: true,
    label: "Note"
  },
  tripId: {
    type: String,
    optional: true,
    label: "Linked to Trip",
    autoValue: function(){
      var item = Trips.findOne({tripFinished: false, tripOwner: this.userId});
      if(typeof item == 'undefined') {
        return null;
      }
      else {
        //return item.name;
        return item._id;
      }
    },
     autoform: {
       type: "hidden"
     }
  },
  owner: {
    type: String,
    label: "Author",
    autoValue: function(){
      return this.userId
    },
    autoform: {
      type: "hidden"
    }
  },
  createdAt: {
    type: Date,
    label: "Created At",
    autoValue: function(){
      return new Date()
    },
    autoform: {
      type: "hidden"
    }
  },
  lng: {
        type: Number,
        optional: true,
        min: -180.0,
        max: 180.0,
        decimal:true,
        autoform: {
          type: "hidden"
        }
    },
    lat: {
        type: Number,
        optional: true,
        min: -90.0,
        max: 90.0,
        decimal: true,
        autoform: {
          type: "hidden"
        }
    }
});
// attach above schema to collection object
Expenses.attachSchema( ExpenseSchema );
