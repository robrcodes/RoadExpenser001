// Export method sourced from:
// http://rafaelquintanilha.com/export-your-json-data-to-csv-format/
// The following methods extract the required database documents and fields, converting the mongo database cursors into true json objects for the exporting to csv format in the exporter.js file

Meteor.methods({
	exportAllExpenses: function(id) {
		var fields = [
      "Category",
      "Expense Type",
      "Odometer",
      "Locality",
      "Value",
      "Comment",
      "Trip Id",
      "Owner",
      "Date Created",
      "Lng",
      "Lat"
		];

		var data = [];

    var tripExpenses = Expenses.find({tripId: id}).fetch();
		_.each(tripExpenses, function(c) {
			data.push([
        c.category,
        c.expenseType,
        c.odometer,
        c.locality,
        c.value,
        c.comment,
        c.tripId,
        c.owner,
        moment.utc(c.createdAt).format("DD/MM/YYYY"),
        c.lng,
        c.lat
			]);
		});

		return {fields: fields, data: data};
	},

	exportTrip: function(id) {
		var fields = [
			"Name",
      "Trip Owner",
      "Odo Start",
      "Odo End",
      "Locality Start",
      "Locality End",
      "Lng Start",
      "Lat Start",
      "Lng End",
      "Lat End",
      "Comment Start",
      "Comment End",
      "Date Start",
      "Date End",
      "Trip Finished"
		];

		var data = [];

		var c = Trips.findOne(id);
		data.push([
      c.name,
      c.tripOwner,
      c.odoStart,
      c.odoEnd,
      c.localityStart,
      c.localityEnd,
      c.lngStart,
      c.latStart,
      c.lngEnd,
      c.latEnd,
      c.commentStart,
      c.commentEnd,
      c.dateStart,
      moment.utc(c.dateStart).format("DD/MM/YYYY"),
      moment.utc(c.dateEnd).format("DD/MM/YYYY"),
      c.tripFinished

		]);

		return {fields: fields, data: data};
	}
});
