var themeOrange = "#FFA534";
var themeRed = "#FB404B";
var themeBlue = "#1DC7EA";
var themePurple = "#9465e9";
var dellTurquoise = "#71c6c1";
var dellBlue = "#007db8";
var dellGreen = "#6fa205";
var dellMagenta = "#b72959";
var dellDarkBlue = "#00386B";

var clear = function(id) {
  var dom = document.getElementById(id.toString());
  while(dom.hasChildNodes()) {
    dom.removeChild(dom.firstChild);
  }
}

var tcBillStatus = function(data, ids) {
  clear(ids.chartId);
  var tcBillStatusDOM = document.getElementById(ids.chartId);
  var margin= {top: 30, right: 20, left: 50, bottom: 30 };
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
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>" + d.data.status + ":</strong><br><span class='text-info'>" + d.data.count + " (" + d.data.percentage + "%)</span>";
      });

  var svg = d3.select(ids.chartId).append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  svg.call(tip);

  var type = function(d) { d.count = +d.count; return d; }


  var newData = {
    "success": {status: "Success", count: data.tcSuccessStatus},
    "waiting": {status: "On Hold", count: data.tcWaitingStatus},
    "rejected": {status: "Rejected", count: data.tcRejectedStatus}
  };

  var total = d3.sum(newData, function(d) {
    return d.count;
  });

  newData.forEach(function(d) {
    d.count = +d.count;
    d.percentage = ((d.count / total) * 100).toFixed(2);
  });

  var g = svg.selectAll(".arc")
      .data(pie(newData))
    .enter().append("g")
      .attr("class", "arc")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .on('click', function(d) {
        var domNode = document.getElementById(ids.tooltipId);
        domNode.style.backgroundColor = color(d.data.status);
        domNode.querySelector(ids.tooltipHeadingId).innerHTML = d.data.status.toString();
        var infoList = domNode.querySelector(".info");
        while(infoList.hasChildNodes()) {
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
          .style("fill", function(d) { return color(d.data.status); })
          .attr("class", "ct-slice-pie");

      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .attr("class", "ct-label")
          .text(function(d) { return d.data.percentage + "%"; });
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

var idify = function(str) {
  var arr = str.split(' ');
  return arr.join('-');
}

var authResponse = function(data) {
  var authResponseDOM = document.getElementById('auth-response');
  clear('auth-response');

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
      });

  var svg = d3.select("#auth-response").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate("+ width / 2 + ", " + height / 2 + ")");

  svg.call(tip);

  var newDataJson = [
    {"status": "Approved", "count": data.authApproved},
    {"status": "Soft Declined", "count": data.authSoftDeclined},
    {"status": "Hard Declined", "count": data.authHardDeclined},
    {"status": "Technical Error", "count": data.authTechnicalError}
  ];

  var newData = JSON.parse(newDataJson);

  var total = d3.sum(newData, function(d) {
    return d.count;
  });

  newData.forEach(function(d) {
    d.count = +d.count;
    d.percentage = ((d.count / total) * 100).toFixed(2);
  });

  var g = svg.selectAll(".arc")
      .data(pie(newData))
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

}
