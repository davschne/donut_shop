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



  var stores = [];
  stores.push(new Store("Downtown", 8, 43, 4.5));
  stores.push(new Store("Capitol Hill", 4, 37, 2));
  stores.push(new Store("South Lake Union", 9, 23, 6.33));
  stores.push(new Store("Wedgewood", 2, 28, 1.25));
  stores.push(new Store("Ballard", 8, 58, 3.75));

  var hours = ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

  function addNewStore(event) {
    event.preventDefault();
    var name = event.target["name"].value,
        minCustPerHour = Number(event.target["min-cust"].value),
        maxCustPerHour = Number(event.target["max-cust"].value),
        avgPerCust = Number(event.target["avg-per-cust"].value),
        store = new Store(name, minCustPerHour, maxCustPerHour, avgPerCust);
    stores.push(store);
    store.writeToTable(hours);
  }

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

  Store.prototype.writeToTable = function(hours) {
    var table = document.querySelector("tbody"),
        row = document.createElement("tr"),
        nameCell = document.createElement("th"),
        totalCell = document.createElement("td"),
        totalDonuts = 0;
      nameCell.textContent = this.name;
      row.appendChild(nameCell);
      for (var i = 0; i < hours.length; i++) {
        var cell = document.createElement("td"),
            donuts = this.donutsPerHour();
        cell.textContent = donuts;
        row.appendChild(cell);
        totalDonuts += donuts;
      };
      totalCell.textContent = totalDonuts;
      row.appendChild(totalCell);
      table.appendChild(row);
  }

  function displayRows(stores, hours) {
    for (var i = 0; i < stores.length; i++) {
      stores[i].writeToTable(hours);
    }
  }

  createTableHeaders(hours);
  displayRows(stores, hours);

  var form = document.querySelector("form");
  form.addEventListener("submit", addNewStore, false);

}(document);
