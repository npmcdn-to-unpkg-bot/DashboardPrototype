$(document).ready(function() {
  var date = new Date();
  var refreshTimes = document.getElementsByClassName("refresh-time")
  for (var i = 0; i < refreshTimes.length; i ++) {
    refreshTimes[i].innerHTML = date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }

  totalRevenueChart();
});

var totalRevenueChart = function () {
  var exampleData = [
    {date:"1-May-12",close:"58.13"},
     {date:"30-Apr-12",close:"53.98"},
     {date:"27-Apr-12",close:"67.00"},
     {date:"26-Apr-12",close:"89.70"},
     {date:"25-Apr-12",close:"99.00"}
  ];

  var parseDate = d3.time.format("%d-%b-%y").parse;

  var data = exampleData.slice();
  var dateFn = function(d) { return parseDate(d.date); };
  var closeFn = function(d) { return d.close; };

  var totalRevenueDOM = document.getElementById('history-total-revenue');
  var margin = {top: 30, right: 20, left: 30, bottom: 30 };
  var height = totalRevenueDOM.clientHeight - margin.top - margin.bottom;
  var width = totalRevenueDOM.clientWidth - margin.right-margin.left;

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x)
      .orient("bottom").ticks(3);

  var yAxis = d3.svg.axis().scale(y)
      .orient("left").ticks(5);

  var valueline = d3.svg.line()
      .x(dateFn)
      .y(closeFn);

  for(var i = 0; i < data.length; i ++) {
    console.log(parseDate(data.date).toString() + ", " + data.close);
  }

  var svg = d3.select("#history-total-revenue")
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(data, dateFn));
  y.domain([0, d3.max(data, closeFn)]);

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
}

var tcBillStatus = function() {
  var exampleData = [

  ]
}
//
// document.getElementById('history-total-revenue').addEventListener("resize", function() {
//   totalRevenueChart();
// })
