!function() {
  function Store(name, minCustPerHour, maxCustPerHour, avgPerCust) {
    this.name = name;
    this.minCustPerHour = minCustPerHour;
    this.maxCustPerHour = maxCustPerHour;
    this.avgPerCust = avgPerCust;
  };

  Store.prototype.donutsPerHour = function() {
    var min = this.minCustPerHour,
        max = this.maxCustPerHour,
        range = max - min,
        customers = Math.floor(Math.random() * (range + 1)) + min;
    return Math.round(this.avgPerCust * customers);
  };

  // This function isn't necessary and isn't used
  Store.prototype.donutsPerDay = function() {
    var total = 0;
    for (var i = 0; i < 11; i++) {
      total += this.donutsPerHour();
    }
  };

  var downtown = new Store("Downtown", 8, 43, 4.5),
      capHill = new Store("Capitol Hill", 4, 37, 2),
      slu = new Store("South Lake Union", 9, 23, 6.33),
      wedgewood = new Store("Wedgewood", 2, 28, 1.25),
      ballard = new Store("Ballard", 8, 58, 3.75);

  var stores = [downtown, capHill, slu, wedgewood, ballard];

  function createTableHeaders() {
    var hours = ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"],
        table = document.querySelector("table"),
        row = "<tr><th></th>";
    for (var i = 0; i < hours.length; i++) {
      row += "<th>" + hours[i] + "</th>";
    }
    row += "<th>Total</th></tr>";
    table.innerHTML += row;
  }

  function displayRows(stores) {
    // helper function to display each row
    var displayRow = function(store) {
      var row = "<tr><th>" + store.name + "</th>",
        hoursInDay = 11,
        totalDonuts = 0,
        table = document.querySelector("table");
      for (var i = 0; i < hoursInDay; i++) {
        var donuts = store.donutsPerHour();
        row += "<td>" + donuts + "</td>";
        totalDonuts += donuts;
      };
      row += "<td>" + totalDonuts + "</td></tr>";
      table.innerHTML += row;
    };
    for (var i = 0; i < stores.length; i++) {
      displayRow(stores[i]);
    }
  }

  createTableHeaders();
  displayRows(stores);
}();
