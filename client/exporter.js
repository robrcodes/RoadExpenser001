// Export method sourced from:
// http://rafaelquintanilha.com/export-your-json-data-to-csv-format/
// these helpers and functions are responsible for converting the database data from json to csv, via the Papa Parse package

MyAppExporter = {
  // exportAllExpenses  == exportAllContacts
  exportAllExpenses: function(id) {
    var self = this;
    Meteor.call("exportAllExpenses", id, function(error, data) {

      if (error) {
        alert(error);
        return false;
      }

      var csv = Papa.unparse(data);
      self._downloadExpensesCSV(csv);
    });
  },

  exportTrip: function(id) {
    // exportTrip == exportContact
    var self = this;
    Meteor.call("exportTrip", id, function(error, data) {

      if (error) {
        alert(error);
        return false;
      }

      var csv = Papa.unparse(data);
      self._downloadTripCSV(csv);
    });
  },

  _downloadTripCSV: function(csv) {
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, {
      type: "text/plain"
    });
    a.download = "tripdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  _downloadExpensesCSV: function(csv) {
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, {
      type: "text/plain"
    });
    a.download = "expensedata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
