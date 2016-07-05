var themeOrange = "#FFA534";
var themeRed = "#FB404B";
var themeBlue = "#1DC7EA";
var themePurple = "#9465e9";
var dellTurquoise = "#71c6c1";
var dellBlue = "#007db8";
var dellGreen = "#6fa205";
var dellMagenta = "#b72959";
var dellDarkBlue = "#00386B";
// var monthlyRevenueChart;

$(document).ready(function() {
  var date = new Date();
  var refreshTimes = document.getElementsByClassName("refresh-time")
  for (var i = 0; i < refreshTimes.length; i ++) {
    refreshTimes[i].innerHTML = date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }
  // totalRevenueChart();
  // monthlyRevenueChart.draw();
  tcBillStatus();
  authResponse();
  activeSubscriptions();

  d3.select(window).on('resize', function () {
    tcBillStatus();
    authResponse();
    activeSubscriptions();
  })
});

// $(document).resize(function() {
//   tcBillStatus();
//   authResponse();
//   activeSubscriptions();
// });

// var totalRevenueChart = function () {
//   var parseDate = d3.time.format("%d-%b-%y").parse;
//
//   // var data = exampleData.slice();
//   var dateFn = function(d) { return parseDate(d.date); };
//   var closeFn = function(d) { return d.close; };
//
//   var totalRevenueDOM = document.getElementById('history-total-revenue');
//   var margin = {top: 30, right: 20, left: 30, bottom: 30 };
//   var height = totalRevenueDOM.clientHeight - margin.top - margin.bottom;
//   var width = totalRevenueDOM.clientWidth - margin.right-margin.left;
//
//   // var x = d3.time.scale().range([0, width]);
//   var x = d3.scale.linear().range([0, width]);
//   var y = d3.scale.linear().range([height, 0]);
//
//   var xAxis = d3.svg.axis().scale(x)
//       .orient("bottom").ticks(3);
//
//   var yAxis = d3.svg.axis().scale(y)
//       .orient("left").ticks(5);
//
//   var valueline = d3.svg.line()
//       .x(function(d) { return x(d['JURISDICTION NAME']); })
//       .y(function(d) { return y(d['COUNT PARTICIPANTS']); });
//
//   var svg = d3.select("#history-total-revenue")
//       .append("svg")
//           .attr("width", width + margin.left + margin.right)
//           .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//           .attr("transform",
//                 "translate(" + margin.left + "," + margin.top + ")");
//
//   d3.csv("https://raw.githubusercontent.com/dchen97/DashboardPrototype/master/x_lbd_free_v1.3/assets/Demographic_Statistics_By_Zip_Code.csv", function(error, data) {
//       data.forEach(function(d) {
//         d['JURISDICTION NAME'] = +d['JURISDICTION NAME'];
//         d['COUNT PARTICIPANTS'] = +d['COUNT PARTICIPANTS'];
//         console.log(d['JURISDICTION NAME']);
//       });
//
//       x.domain(d3.extent(data, function(d) { return d['JURISDICTION NAME']; }));
//       y.domain([0, d3.max(data, function(d) { return d['COUNT PARTICIPANTS']; })]);
//
//       svg.append("path")
//           .attr("class", "line")
//           .attr("d", valueline(data));
//
//       svg.append("g")
//           .attr("class", "x axis")
//           .attr("transform", "translate(0," + height + ")")
//           .call(xAxis);
//
//       svg.append("g")
//           .attr("class", "y axis")
//           .call(yAxis);
//   });
// }

var clear = function(id) {
  var dom = document.getElementById(id.toString());
  while(dom.hasChildNodes()) {
    dom.removeChild(dom.firstChild);
  }
}

var tcBillStatus = function() {
    clear('tc-bill-status');
    var tcBillStatusDOM = document.getElementById('tc-bill-status');
    // while(tcBillStatusDOM.hasChildNodes()) {
    //   tcBillStatusDOM.removeChild(tcBillStatusDOM.firstChild);
    // }
    var margin = {top: 30, right: 20, left: 50, bottom: 30 };
    var height = tcBillStatusDOM.clientHeight - margin.top - margin.bottom;
    var width = tcBillStatusDOM.clientWidth - margin.right-margin.left;
    var radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range([dellBlue, dellMagenta, dellGreen]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius-40)
        .innerRadius(radius-40);

    var pie = d3.layout.pie()
        .sort(null)
        .padAngle(0.02)
        .value(function(d) { return d.count; });

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10,0])
        .html(function(d) {
          return "<strong>" + d.data.status + ":</strong>\n <span class='text-info'>" + d.data.count + " (" + d.data.percentage + "%)</span>";
        })

    var svg = d3.select("#tc-bill-status").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.call(tip);

    var type = function(d) { d.count = +d.count; return d; }

    d3.csv("https://raw.githubusercontent.com/dchen97/DashboardPrototype/master/x_lbd_free_v1.3/data2.csv", type, function(error, data) {
      if (error) throw error;

      var total = d3.sum(data, function(d) {
        return d.count;
      });

      data.forEach(function(d) {
        d.percentage = ((d.count / total) * 100).toFixed(2);
      });

      var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc")
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          .on("click", function(d) {
            var domNode = document.getElementById("tc-bill-info");
            // var color = d3.scale.ordinal()
            //     .range([dellBlue, dellMagenta, dellGreen, dellTurquoise]);
            domNode.style.backgroundColor = color(d.data.status);
            domNode.querySelector('#tc-bill-info-status').innerHTML = d.data.status.toString();
            var infoList = domNode.querySelector(".info");
            while (infoList.hasChildNodes()) {
              infoList.removeChild(infoList.firstChild);
            }
            var node1 = document.createElement("LI");
            node1.innerHTML = d.data.count.toString();
            var node2 = document.createElement("LI");
            node2.innerHTML = d.data.percentage.toString() + "%";
            infoList.appendChild(node1);
            infoList.appendChild(node2);
          })
          .on("focus", function() { d3.select(this).attr("class", "arc arc-focused"); })
          .on("blur", function(event) { d3.select(this).attr("class", "arc"); });;

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.status); })
          .attr("class", "ct-slice-pie");

      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .attr("class", "ct-label")
          .text(function(d) { return d.data.percentage + "%"; });
  });
}

var changeTooltip = function(ids, colors, data, otherHtml) {
  var domNode = document.getElementById(id.toString());
  domNode.setAttribute("style", "background-color: " + color() + ";");
  domNode.getElementsByClassName('custom-tooltip-heading')
      .innerHTML = status();
  var innerhtml = "<li>" + count() + "</li><li>" + percentage() + "%</li>";
  if (otherHtml) {
    innerhtml += otherHtml;
  }
  domNode.getElementById('info').innerHTML = otherHtml;
}

var activeSubscriptions = function() {
  clear('active-subs');
  var activeSubsDOM = document.getElementById('active-subs');
  // while(activeSubsDOM.hasChildNodes()) {
  //   activeSubsDOM.removeChild(activeSubsDOM.firstChild);
  // }
  var margin = {top: 30, right: 20, left: 30, bottom: 30};
  var height = activeSubsDOM.clientHeight - margin.top - margin.bottom;
  var width = activeSubsDOM.clientWidth - margin.right - margin.left;

  var parseDate = d3.time.format("%Y").parse;

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x)
      .orient("bottom").ticks(5);

  var yAxis = d3.svg.axis().scale(y)
      .orient("left").ticks(5);

  var valueline = d3.svg.line()
      .x(function(d) { return x(d['Year']); })
      .y(function(d) { return y(d['Rate per 1000'])})

  var svg = d3.select("#active-subs")
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("https://raw.githubusercontent.com/dchen97/DashboardPrototype/master/x_lbd_free_v1.3/data4.csv", function(error, data) {
    data.forEach(function(d) {
      d['Year'] = parseDate(d['Year']);
      d['Rate per 1000'] = +d['Rate per 1000'];
    });



    x.domain(d3.extent(data, function(d) { return d['Year']; }));
    y.domain([0, d3.max(data, function(d) { return d['Rate per 1000']; })]);

    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var formatTime = d3.time.format("%Y");

    var seriesEnter = svg.selectAll("circle")
        .data(data)
        .enter().append('circle')
        .attr("cx", function(d) { return x(d['Year']); })
        .attr("cy", function(d) { return y(d['Rate per 1000']); })
        .attr("r", 4)
        .attr("stroke", themeBlue)
        .attr("stroke-width", "2px")
        .attr("fill", "transparent")
        .on("mouseover", function(d) {
          d3.select(this).transition()
              .duration(200)
              .attr("stroke", dellBlue)
              .attr("stroke-width", "4px")
              .attr("fill", dellBlue)
              .attr("r", 6);
          div.transition()
              .duration(200)
              .style("opacity", .9);
          div.html("<b><em>" + formatTime(d['Year']) + "</em></b><br />" + d['Rate per 1000'])
              .style("left", (d3.event.pageX - 30) + "px")
              .style("top", (d3.event.pageY - 40) + "px");
        })
        .on("mouseout", function() {
          d3.select(this).transition()
              .duration(200)
              .attr("stroke", themeBlue)
              .attr("stroke-width", "2px")
              .attr("fill", "transparent")
              .attr("r", 4);
          div.transition()
              .duration(500)
              .style("opacity", 0);
        });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
  });
}

var authResponse = function() {
  var authResponseDOM = document.getElementById('auth-response');
  clear('auth-response');
  // while(authResponseDOM.hasChildNodes()) {
  //   authResponseDOM.removeChild(authResponseDOM.firstChild);
  // }
  var margin = {top: 30, right: 20, left: 50, bottom: 30};
  var height = authResponseDOM.clientHeight - margin.top - margin.bottom;
  var width = authResponseDOM.clientWidth - margin.right - margin.left;
  var radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .range([dellBlue, dellMagenta, dellGreen, dellTurquoise]);

  var arc = d3.svg.arc()
      .outerRadius(radius-10)
      .innerRadius(0);

  var labelArc = d3.svg.arc()
      .outerRadius(radius-40)
      .innerRadius(radius-40);

  var pie = d3.layout.pie()
      .sort(d3.descending)
      .padAngle(0.02)
      .value(function(d) { return d.count; });

  var tip = d3.tip()
      .attr('class','d3-tip')
      .offset([-10,0])
      .html(function(d) {
        return "<strong>" + d.data.status + ":</strong>\n <span class='text-info'>" + d.data.count + " (" + d.data.percentage + "%)</span>";
      })

  var svg = d3.select("#auth-response").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate("+ width / 2 + ", " + height / 2 + ")");

  svg.call(tip);

  var type = function(d) { d.count = +d.count; return d; }

  d3.csv("https://raw.githubusercontent.com/dchen97/DashboardPrototype/master/x_lbd_free_v1.3/data3.csv", type, function(error, data) {
    if (error) throw error;

    var total = d3.sum(data, function(d) {
      return d.count;
    });

    data.forEach(function(d) {
      d.percentage = ((d.count / total) * 100).toFixed(2);
    });

    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc")
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .on("click", function(d) {
          var domNode = document.getElementById("auth-response-info");
          // var color = d3.scale.ordinal()
          //     .range([dellBlue, dellMagenta, dellGreen, dellTurquoise]);
          domNode.style.backgroundColor = color(d.data.status);
          domNode.querySelector('#auth-response-status').innerHTML = d.data.status.toString();
          var infoList = domNode.querySelector(".info");
          while (infoList.hasChildNodes()) {
            infoList.removeChild(infoList.firstChild);
          }
          var node1 = document.createElement("LI");
          node1.innerHTML = d.data.count.toString();
          var node2 = document.createElement("LI");
          node2.innerHTML = d.data.percentage.toString() + "%";
          infoList.appendChild(node1);
          infoList.appendChild(node2);
        })
        .on("focus", function() { d3.select(this).attr("class", "arc arc-focused"); })
        .on("blur", function(event) { d3.select(this).attr("class", "arc"); });

    g.append("path")
        .attr("d", arc)
        .attr("class","ct-slice-pie")
        .attr("id", function(d) {
            return "auth-response-" + idify(d.data.status);
          })
        .style("fill", function(d) {
            return color(d.data.status);
          });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .attr("class", "ct-label")
        .text(function(d) { return d.data.percentage + "%"; });
  });
}

var idify = function(str) {
  var arr = str.split(' ');
  return arr.join('-');
}

var tcOnClick = {

}
//
// document.getElementById('history-total-revenue').addEventListener("resize", function() {
//   totalRevenueChart();
// })
