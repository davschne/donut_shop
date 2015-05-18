function Store(minCustPerHour, maxCustPerHour, avgPerCust) {
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgPerCust = avgPerCust;
};

Store.prototype.donutsPerHour() {
  var min = this.minCustPerHour,
      max = this.maxCustPerHour,
      range = max - min,
      customers = Math.floor(Math.random() * (range + 1)) + min;
  return this.avgPerCust * customers;
};

Store.prototype.donutsPerDay() {
  var total = 0;
  for (var i = 0; i < 11; i++) {
    total += this.donutsPerHour();
  }
};

var downtown = new Store(8, 43, 4.5);
var capHill = new Store(4, 37, 2);
var slu = new Store(9, 23, 6.33);
var wedgewood = new Store(2, 28, 1.25);
var ballard = new Store(8, 58, 3.75);

