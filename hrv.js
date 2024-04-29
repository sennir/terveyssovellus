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

import { fetchData } from './fetch.js';
let data;

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



async function updateScale() {
    const id = localStorage.getItem('userID');
    console.log('Getting individual entries for ID:', id);
    
    const url = `http://127.0.0.1:3000/api/hrv`;
    const token = localStorage.getItem('token');
    console.log(token);
    
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    try {
        console.log(options, url);
        data = await fetchData(url, options);
        // console.log(data);
        draw(data);

    } catch (error) {
        console.error('Error fetching data:', error);
    } 
}

updateScale()

console.log(data, 'hei');

// Create placeholder data for each month

    function draw(data){
        console.log(data[0].hrvValue, 'tässä on uusi data');
    var placeholderData = [
        { week: 1, hrv: data[0].hrvValue },
        { week: 2, hrv: data[1].hrvValue },
        { week: 3, hrv: data[2].hrvValue },
        { week: 4, hrv: data[3].hrvValue },
        { week: 5, hrv: data[4].hrvValue },
        { week: 6, hrv: data[5].hrvValue },
        { week: 7, hrv: data[6].hrvValue },
        { week: 8, hrv: data[7].hrvValue },
        { week: 9, hrv: data[8].hrvValue },
        { week: 10, hrv: data[9].hrvValue },
        { week: 11, hrv: data[10].hrvValue },
        { week: 12, hrv: data[11].hrvValue },
        { week: 13, hrv: data[12].hrvValue },
        { week: 14, hrv: data[13].hrvValue },
        { week: 15, hrv: data[14].hrvValue },
        { week: 16, hrv: data[15].hrvValue },
        { week: 17, hrv: data[16].hrvValue },
        { week: 18, hrv: data[17].hrvValue },
        { week: 19, hrv: data[18].hrvValue },
        { week: 20, hrv: data[19].hrvValue }
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
  categoryField: "week",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

xAxis.data.setAll(placeholderData);


// Update y-axis configuration
var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  max: 300,
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
  valueYField: "hrv",
  categoryXField: "week",
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

var viikkoButton = document.getElementById('viikkoButton');

// Lisätään tapahtumankäsittelijä 'viikko' -napille
viikkoButton.addEventListener('click', function() {
  // Lasketaan viimeisen viikon alkamis- ja päättymispäivät
  var endDate = new Date(seriesData[seriesData.length - 1].date);
  var startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 6); // Viimeisen 7 päivän päivämäärä

  // Suodatetaan data sisältämään vain viimeisen 7 päivän tiedot
  var filteredData = seriesData.filter(function(data) {
    var dataDate = new Date(data.date);
    return dataDate >= startDate && dataDate <= endDate;
  });
  
  // Päivitetään kaavion data ja x-akselin skaala kattamaan viimeiset 7 päivää
  series.data.setAll(filteredData);
  xAxis.set("min", startDate.getTime());
  xAxis.set("max", endDate.getTime());



// Calculate the average mood
var totalMood = 0;
for (var i = 0; i < placeholderData.length; i++) {
  totalMood += placeholderData[i].mood;
}
var averageMood = Math.round(totalMood / placeholderData.length);

// Map the average mood to an emoji
var emojiMap = {
  1: '😭', // Emoji for value 1
  2: '😢', // Emoji for value 2
  3: '😐', // Emoji for value 3
  4: '😊', // Emoji for value 4
  5: '😁'  // Emoji for value 5
};
var averageMoodEmoji = emojiMap[averageMood];

    }

// Display the average mood emoji in the "mood-description" section with a class
document.getElementById('mood-description').innerHTML = '<h2 class="large-emoji">Mieliala ' + averageMoodEmoji + '</h2>';