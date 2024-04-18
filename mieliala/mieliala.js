/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX",
  layout: root.verticalLayout,
  pinchZoomX: true,
  paddingLeft: 0
}));



// Add cursor
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none"
}));
cursor.lineY.set("visible", false);

// Create placeholder data for each month
var placeholderData = [
  { month: "Jan", mood: 1 },
  { month: "Feb", mood: 2 },
  { month: "Mar", mood: 1 },
  { month: "Apr", mood: 1 },
  { month: "May", mood: 3 },
  { month: "Jun", mood: 1 },
  { month: "Jul", mood: 4 },
  { month: "Aug", mood: 2 },
  { month: "Sep", mood: 4 },
  { month: "Oct", mood: 1 },
  { month: "Nov", mood: 2 },
  { month: "Dec", mood: 1 }
];

// Create axes
var xRenderer = am5xy.AxisRendererX.new(root, {
  minorGridEnabled: true,
  minGridDistance: 80
});
xRenderer.grid.template.set("location", 0.5);
xRenderer.labels.template.setAll({
  location: 0.5,
  multiLocation: 0.5
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "month",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

xAxis.data.setAll(placeholderData);


// Update y-axis configuration
var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  max: 5,
  strictMinMax: true, // Ensure that the min and max values are strictly adhered to
  renderer: am5xy.AxisRendererY.new(root, {
    minGridDistance: 20, // Adjust this value to change the number of grid lines
  })
}));

yAxis.set("step", 1); // Set the step to 1 to display every integer value



// Create series
var series = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "mood",
  categoryXField: "month",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}",
    dy: -5
  })
}));

series.strokes.template.setAll({
  templateField: "strokeSettings",
  strokeWidth: 2
});

series.fills.template.setAll({
  visible: true,
  fillOpacity: 0.5,
  templateField: "fillSettings"
});

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      templateField: "bulletSettings",
      radius: 5
    })
  });
});

// Combine series data
series.data.setAll(placeholderData);

// Add scrollbar
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  marginBottom: 20
}));

// Make stuff animate on load
chart.appear(1000, 100);

// Assuming moodEntries is an array of mood values for each day of the month
var moodEntries = [1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4, 5, 4, 3];

// Calculate the average mood
var totalMood = 0;
for (var i = 0; i < moodEntries.length; i++) {
  totalMood += moodEntries[i];
}
var averageMood = Math.round(totalMood / moodEntries.length);

// Map the average mood to an emoji
var emojiMap = {
  1: '😭', // Emoji for value 1
  2: '😢', // Emoji for value 2
  3: '😐', // Emoji for value 3
  4: '😊', // Emoji for value 4
  5: '😁'  // Emoji for value 5
};
var averageMoodEmoji = emojiMap[averageMood];

// Display the average mood emoji in the "mood-description" section
document.getElementById('mood-description').innerHTML = '<h2>Mieliala ' + averageMoodEmoji + '</h2>';