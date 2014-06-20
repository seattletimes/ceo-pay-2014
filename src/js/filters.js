define([
  "app"
], function(app) {

  var formatNumber = function(s) {
    s = s + "";
    var start = s.indexOf(".");
    if (start == -1) start = s.length;
    for (var i = start - 3; i > 0; i -= 3) {
      s = s.slice(0, i) + "," + s.slice(i);
    }
    return s;
  };

  app.filter("formatNumber", function() { return formatNumber });

  app.filter("formatMoney", function() {
    return function(s) {
      //s = s.toFixed(2);
      s = formatNumber(s);
      return s.replace(/^(-)?/, function(_, captured) { return (captured || "") + "$" });
    };
  });

  app.filter("formatPercent", function() {
    return function(s) {
      s = (s * 100).toFixed(1) + "";
      return s + "%"
    };
  });

  app.filter("cull", function() {
    return function(list, filterString) {
      //wildcard
      if (filterString == "*") return list;
      var parts = filterString.split(/\b/);
      var key = parts[0];
      var op = parts[1];
      var value = parts[2];
      if (value.match(/\d+/)) {
        value *= 1;
      } else {
        value = "'" + value + "'";
      }
      var fn = new Function("key", "value", "item", "return item[key] " + op + value);
      return list.filter(fn.bind(null, key, value));
    }
  })
})