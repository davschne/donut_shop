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

  Store.prototype.writeToTable = function(hours) {
    var table = document.querySelector("tbody"),
        row = document.createElement("tr"),
        nameCell = document.createElement("th"),
        totalCell = document.createElement("td"),
        totalDonuts = 0;

    // Add first cell (store name)
    nameCell.textContent = this.name;
    nameCell.setAttribute("class", "storeName");
    row.appendChild(nameCell);

    // Add cells (donuts per hour)
    for (var i = 0; i < hours.length; i++) {
      var cell = document.createElement("td"),
          donuts = this.donutsPerHour();
      cell.textContent = donuts;
      row.appendChild(cell);
      totalDonuts += donuts;
    };

    // Add last cell (total donuts per day)
    totalCell.textContent = totalDonuts;
    row.appendChild(totalCell);

    // Set id, so we can find it later
    row.setAttribute("id", this.name);

    // Get the store's row, if it exists
    var elRow = document.getElementById(this.name);
    if (elRow) {
      // If row is already in table, replace it
      table.replaceChild(row, elRow);
    } else {
      // Otherwise append to the table
      table.appendChild(row);
    }
  };

  function getStoreIndexByName(name, stores) {
    for (var i = 0; i < stores.length; i++) {
      if (name.toLowerCase() == stores[i].name.toLowerCase()) return i;
    }
    return null;
  };

  function addOrModifyStore(event) {
    event.preventDefault();

    var target = event.target,
        name = target["name"].value,
        minCustPerHour = Number(target["min-cust"].value),
        maxCustPerHour = Number(target["max-cust"].value),
        avgPerCust = Number(target["avg-per-cust"].value),
        index = getStoreIndexByName(name, stores),
        store;

    if (index == null) {
      // create a new store
      store = new Store(name, minCustPerHour, maxCustPerHour, avgPerCust);
      stores.push(store);
    } else {
      // modify an existing store
      store = stores[index];
      store.minCustPerHour = minCustPerHour;
      store.maxCustPerHour = maxCustPerHour;
      store.avgPerCust = avgPerCust;
    }

    // modify table
    store.writeToTable(hours);
  };

  function createTableHeaders(hours) {
    var table = document.querySelector("thead"),
        row = document.createElement("tr"),
        headings = [""].concat(hours, "Total"); // column headings

    for (var i = 0; i < headings.length; i++) {
      var cell = document.createElement("th");
      cell.textContent = headings[i];
      row.appendChild(cell);
    }
    row.setAttribute("class", "header");
    table.appendChild(row);
  };

  function displayRows(stores, hours) {
    for (var i = 0; i < stores.length; i++) {
      stores[i].writeToTable(hours);
    }
  };

  var stores = [];
  stores.push(new Store("Downtown", 8, 43, 4.5));
  stores.push(new Store("Capitol Hill", 4, 37, 2));
  stores.push(new Store("South Lake Union", 9, 23, 6.33));
  stores.push(new Store("Wedgewood", 2, 28, 1.25));
  stores.push(new Store("Ballard", 8, 58, 3.75));

  var hours = ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

  createTableHeaders(hours);
  displayRows(stores, hours);

  var form = document.querySelector("form");
  form.addEventListener("submit", addOrModifyStore, false);

}(document);
