class MonthlyRevenueChart {
  this.parseDate = d3.time.format("%b %Y").parse;
  this.monthlyRevenueDOM = document.getElementById('history-monthly-revenue');
  const margin = {top: 30, right: 20, left: 30, bottom: 30 };
  this.height;
  this.width;
  this.x;
  this.y;

  this.constructor = function() {
    _calcPosition();
  }

  this.getHeight = function() {
    return height;
  }

  this.getWidth = function() {
    return width;
  }

  this._calcHeight = function() {
    height = monthlyRevenueDOM.clientHeight - margin.top - margin.bottom;
  }

  this._calcWidth = function() {
    width = monthlyRevenueDOM.clientWidth - margin.right - margin.left;
  }

  this._calcX = function() {
    x = d3.time.scale().range([0, width]);
  }

  this._calcY = function() {
    y = d3.scale.linear().range([height, 0]);
  }

  this._calcPosition = function() {
    _calcHeight();
    _calcWidth();
    _calcX();
    _calcY();
  }

  this.draw = function() {
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(3);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    var valueline = d3.svg.line()
        .x(function(d) { return x(d['JURISDICTION NAME']); })
        .y(function(d) { return y(d['COUNT PARTICIPANTS']); });

    var svg = d3.select("#history-monthly-revenue")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("https://raw.githubusercontent.com/dchen97/DashboardPrototype/master/x_lbd_free_v1.3/data.csv", function(error, data) {
      data.forEach(function(d) {
        d.Month = parseDate(d.Month);
        d.Revenue = +d.Revenue;
      });

      x.domain(d3.extent(data, function(d) { return d.Month; }));
      y.domain([0, d3.max(data, function(d) { return d.Revenue; })]);

      svg.append("path")
          .attr("class", "line")
          .attr("d", valueline(data));

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);
    });
  }

  this.redraw = function() {
    while (monthlyRevenueDOM.hasChildNodes()) {
        monthlyRevenueDOM.removeChild(monthlyRevenueDOM.firstChild);
    }

    _calcPosition();
    draw();
  }
}
