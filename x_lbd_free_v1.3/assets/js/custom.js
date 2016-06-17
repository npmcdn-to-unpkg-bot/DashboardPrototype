$(document).ready(function() {
  var date = new Date();
  var refreshTimes = document.getElementsByClassName("refresh-time")
  for (var i = 0; i < refreshTimes.length; i ++) {
    refreshTimes[i].innerHTML = date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }

  totalRevenueChart();
  tcBillStatus();
});

var totalRevenueChart = function () {
  // var exampleData = [
  //   {date:"1-May-12",close:"58.13"},
  //    {date:"30-Apr-12",close:"53.98"},
  //    {date:"27-Apr-12",close:"67.00"},
  //    {date:"26-Apr-12",close:"89.70"},
  //    {date:"25-Apr-12",close:"99.00"}
  // ];

  var parseDate = d3.time.format("%d-%b-%y").parse;

  // var data = exampleData.slice();
  var dateFn = function(d) { return parseDate(d.date); };
  var closeFn = function(d) { return d.close; };

  var totalRevenueDOM = document.getElementById('history-total-revenue');
  var margin = {top: 30, right: 20, left: 30, bottom: 30 };
  var height = totalRevenueDOM.clientHeight - margin.top - margin.bottom;
  var width = totalRevenueDOM.clientWidth - margin.right-margin.left;

  // var x = d3.time.scale().range([0, width]);
  var x = d3.scale.linear().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x)
      .orient("bottom").ticks(3);

  var yAxis = d3.svg.axis().scale(y)
      .orient("left").ticks(5);

  var valueline = d3.svg.line()
      .x(function(d) { return x(d['JURISDICTION NAME']); })
      .y(function(d) { return y(d['COUNT PARTICIPANTS']); });

  // for(var i = 0; i < data.length; i ++) {
  //   console.log(parseDate(data.date).toString() + ", " + data.close);
  // }

  var svg = d3.select("#history-total-revenue")
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("https://rawgit.com/dchen97/DashboardPrototype/master/x_lbd_free_v1.3/assets/Demographic_Statistics_By_Zip_Code.csv", function(error, data) {
      data.forEach(function(d) {
        d['JURISDICTION NAME'] = +d['JURISDICTION NAME'];
        d['COUNT PARTICIPANTS'] = +d['COUNT PARTICIPANTS'];
      });

      x.domain(d3.extent(data, function(d) { return d['JURISDICTION NAME']; }));
      y.domain([0, d3.max(data, function(d) { return d['COUNT PARTICIPANTS']; })]);

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

var tcBillStatus = function() {
    var tcBillStatusDOM = document.getElementById('tc-bill-status');
    var margin = {top: 30, right: 20, left: 30, bottom: 30 };
    var height = tcBillStatusDOM.clientHeight - margin.top - margin.bottom;
    var width = tcBillStatusDOM.clientWidth - margin.right-margin.left;
    var radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#FFA534", "#FB404B", "#1DC7EA"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius-40)
        .innerRadius(radius-40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.count; });

    var svg = d3.select("#tc-bill-status").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var type = function(d) { d.count = +d.count; return d; }

    d3.csv("https://raw.githubusercontent.com/dchen97/DashboardPrototype/master/x_lbd_free_v1.3/data2.csv", type, function(error, data) {
      if (error) throw error;

      var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.status); });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) { return d.data.status; });
    });
}
//
// document.getElementById('history-total-revenue').addEventListener("resize", function() {
//   totalRevenueChart();
// })
