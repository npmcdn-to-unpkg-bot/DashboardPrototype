height = 0;
width = 0;
parseDate = d3.time.format("%b %Y").parse;
monthlyRevenueDOM = document.getElementById('history-monthly-revenue');
margin = {top: 30, right: 20, left: 30, bottom: 30 };
x = -1;
y = -1;

monthlyRevenueChart = {
  constructor: function() {
    calcPosition();
  },

  getHeight: function() {
    return height;
  },

  getWidth: function() {
    return width;
  },
  //
  // calcWidth: function() {
  //   height = monthlyRevenueDOM.clientHeight - margin.top - margin.bottom;
  // },
  //
  // calcHeight: function() {
  //   width = monthlyRevenueDOM.clientWidth - margin.right - margin.left;
  // },
  //
  // calcX: function() {
  //   x = d3.time.scale().range([0, this.width]);
  // },
  //
  // calcY: function() {
  //   y = d3.scale.linear().range([this.height, 0]);
  // },

  calcPosition: function() {
    // this.calcHeight();
    // this.calcWidth();
    // this.calcX();
    // calcY();
    //

    height = monthlyRevenueDOM.clientHeight - margin.top - margin.bottom;
    width = monthlyRevenueDOM.clientWidth - margin.right - margin.left;
    x = d3.time.scale().range([0, this.width]);
    y = d3.scale.linear().range([this.height, 0]);
  },

  draw: function() {
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(3);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    var valueline = d3.svg.line()
        .x(function(d) { return x(d.Month); })
        .y(function(d) { return y(d.revenue); });

    var svg = d3.select('#history-monthly-revenue')
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("https://raw.githubusercontent.com/dchen97/DashboardPrototype/master/x_lbd_free_v1.3/data.csv", function(error, data) {
      data.forEach(function(d) {
        d.Month = d3.time.format("%b %Y").parse(d.Month);
        d.revenue = +d.revenue;
        console.log(d.revenue);
      });

      x.domain(d3.extent(data, function(d) { return d.Month; }));
      y.domain([0, d3.max(data, function(d) { return d.revenue; })]);

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
  },

  redraw: function() {
    while(monthlyRevenueDOM.hasChildNodes()) {
      monthlyRevenueDOM.removeChild(monthlyRevenueDOM.firstChild);
    }

    calcPosition();
    draw();
  }
}
