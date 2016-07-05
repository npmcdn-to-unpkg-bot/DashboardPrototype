var MonthlyRevenueChart = function() {
  this.parseDate = d3.time.format("%b %Y").parse;
  this.monthlyRevenueDOM = document.getElementById('history-monthly-revenue');
  this.margin = {top: 30, right: 20, left: 30, bottom: 30 };
  this.calcPosition();
}

MonthlyRevenueChart.prototype.getHeight = function() {
  return this.height;
}

MonthlyRevenueChart.prototype.getWidth = function() {
  return this.width;
}

MonthlyRevenueChart.prototype.calcHeight = function() {
  this.height = this.monthlyRevenueDOM.clientHeight - this.margin.top - this.margin.bottom;
}

MonthlyRevenueChart.prototype.calcWidth = function() {
  this.width = this.monthlyRevenueDOM.clientWidth - this.margin.left - this.margin.right;
}

MonthlyRevenueChart.prototype.calcX = function() {
  this.x = d3.time.scale().range([0, this.width]);
}

MonthlyRevenueChart.prototype.calcY = function() {
  this.y = d3.scale.linear().range([this.height, 0]);
}

MonthlyRevenueChart.prototype.calcPosition = function() {
  this.calcHeight();
  this.calcWidth();
  this.calcX();
  this.calcY();
}

MonthlyRevenueChart.prototype.draw = function () {
  var xAxis = d3.svg.axis().scale(this.x)
      .orient("bottom").ticks(3);

  var yAxis = d3.svg.axis().scale(this.y)
      .orient("left").ticks(5);

  var valueline = d3.svg.line()
      .x(function(d) { return this.x(d.Month); })
      .y(function(d) { return this.y(d.Revenue); });

  var svg = d3.select("#history-monthly-revenue")
      .append("svg")
          .attr("width", this.width + this.margin.left + this.margin.right)
          .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
          .attr("transform",
                "translate(" + this.margin.left + "," + this.margin.top + ")");

  console.log(this.x);

  d3.csv("https://raw.githubusercontent.com/dchen97/DashboardPrototype/master/x_lbd_free_v1.3/data.csv", function(error, data) {
    data.forEach(function(d) {
      d.Month = d3.time.format("%b %Y").parse(d.Month);
      d.Revenue = +d.Revenue;
    });

    x.domain(d3.extent(data, function(d) { return d.Month; }));
    this.y.domain([0, d3.max(data, function(d) { return d.Revenue; })]);

    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this.height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
  });
};

MonthlyRevenueChart.prototype.redraw = function() {
  while (monthlyRevenueDOM.hasChildNodes()) {
      monthlyRevenueDOM.removeChild(monthlyRevenueDOM.firstChild);
  }

  MonthlyRevenueChart.prototype._calcPosition();
  MonthlyRevenueChart.prototype.draw();

}
