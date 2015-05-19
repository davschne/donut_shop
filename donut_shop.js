!function(document) {
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
  Store.prototype.donutsPerDay = function(hours) {
    var total = 0;
    for (var i = 0; i < hours.length; i++) {
      total += this.donutsPerHour();
    }
    return total;
  };

  var downtown = new Store("Downtown", 8, 43, 4.5),
      capHill = new Store("Capitol Hill", 4, 37, 2),
      slu = new Store("South Lake Union", 9, 23, 6.33),
      wedgewood = new Store("Wedgewood", 2, 28, 1.25),
      ballard = new Store("Ballard", 8, 58, 3.75);

  var stores = [downtown, capHill, slu, wedgewood, ballard];

  var hours = ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

  function createTableHeaders(hours) {
    var table = document.querySelector("thead"),
        row = document.createElement("tr"),
        headings = [""].concat(hours, "Total"); // column headings
    for (var i = 0; i < headings.length; i++) {
      var cell = document.createElement("th");
      cell.textContent = headings[i];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  function displayRows(stores, hours) {
    var table = document.querySelector("tbody");
    // helper function to display each row
    var displayRow = function(store) {
      var row = document.createElement("tr"),
        nameCell = document.createElement("th"),
        totalCell = document.createElement("td"),
        totalDonuts = 0;
      nameCell.textContent = store.name;
      row.appendChild(nameCell);
      for (var i = 0; i < hours.length; i++) {
        var cell = document.createElement("td"),
            donuts = store.donutsPerHour();
        cell.textContent = donuts;
        row.appendChild(cell);
        totalDonuts += donuts;
      };
      totalCell.textContent = totalDonuts;
      row.appendChild(totalCell);
      table.appendChild(row);
    };
    for (var i = 0; i < stores.length; i++) {
      displayRow(stores[i]);
    }
  }

  createTableHeaders(hours);
  displayRows(stores, hours);

}(document);
