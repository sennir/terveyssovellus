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
  pinchZoomX:true,
  paddingLeft: 0
}));

// Hiiren kursorin käyttäytyminen
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none"
}));
cursor.lineY.set("visible", false);

// Random dataa generoiva funktio, ei käytössä

// var date = new Date();
// date.setHours(0, 0, 0, 0);
// var value = 100;

// function generateData() {
//   value = Math.round((Math.random() * 10 - 5) + value);
//   am5.time.add(date, "day", 1);
//   return {
//     date: date.getTime(),
//     value: value
//   };
// }

// function generateDatas(count) {
//   var data = [];
//   for (var i = 0; i < count; ++i) {
//     data.push(generateData());
//   }
//   return data;
// }

// X-akselin asetukset
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.2,
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled:true
  }),
  tooltip: am5.Tooltip.new(root, {})
}));

// Y-akselin asetukset
var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    pan:"zoom"
  }),
  // min ja max arvot, jotta y-akseli sopii emojeille parhaiten
  min: 0,
  max: 5,
}));



// Luodaan viivakaavio
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}"
  })
}));

// Lisätään pisteet viivan päälle
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5, // pisteen koko
      fill: am5.color("#7b9cff") // pisteen väri
    })
  });
});

// Viivan täyte maalaus
series.fills.template.setAll({
  visible: true,
  fillOpacity: 0.5, // läpinäkyvyyden säätö
  fill: am5.color("#7b9cff") // täytteen väri
});

// skrollauspalkin asetukset
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
}));

var placeholderData = [
  { date: "2024-01-01", mood: 5 },
  { date: "2024-02-01", mood: 5 },
  { date: "2024-03-01", mood: 5 },
  { date: "2024-04-01", mood: 5 },
  { date: "2024-05-01", mood: 5 },
  { date: "2024-06-01", mood: 5 },
  { date: "2024-07-01", mood: 5 },
  { date: "2024-08-01", mood: 5 },
  { date: "2024-09-01", mood: 4 },
  { date: "2024-10-01", mood: 5 },
  { date: "2024-11-01", mood: 2 },
  { date: "2024-12-01", mood: 5 },
  // Lisää dataa joulukuulle testausta varten
  { date: "2024-12-02", mood: 1 },
  { date: "2024-12-03", mood: 1 },
  { date: "2024-12-04", mood: 2 },
  { date: "2024-12-05", mood: 1 },
  { date: "2024-12-06", mood: 3 },
  { date: "2024-12-07", mood: 1 },
  { date: "2024-12-08", mood: 1 },
  { date: "2024-12-09", mood: 1 },
  { date: "2024-12-10", mood: 1 },
  { date: "2024-12-11", mood: 1 },
  { date: "2024-12-12", mood: 1 },
  { date: "2024-12-13", mood: 1 },
];

// Konvertoidaan data viivakaavion ymmärtämään muotoon
var seriesData = [];
// Käydään läpi placeholderData ja lisätään se seriesDataan
for (var i = 0; i < placeholderData.length; i++) {
// Lisätään data seriesDataan
  seriesData.push({ date: new Date(placeholderData[i].date).getTime(), value: placeholderData[i].mood });
}
// Asetetaan seriesData viivakaavioon
series.data.setAll(seriesData);

// Lasketaan keskimääräinen mieliala
var totalMood = 0;
for (var i = 0; i < placeholderData.length; i++) {
  totalMood += placeholderData[i].mood;
}
var averageMood = Math.round(totalMood / placeholderData.length);

// Mieliala emoji kartta
var emojiMap = {
  1: '😭', // Emoji for value 1
  2: '😢', // Emoji for value 2
  3: '😐', // Emoji for value 3
  4: '😊', // Emoji for value 4
  5: '😁'  // Emoji for value 5
};

var averageMoodEmoji = emojiMap[averageMood];

// Asetetaan keskimääräinen mieliala sivulle, mieliala osioon
document.getElementById('mood-description').innerHTML = '<h2 class="large-emoji">Mieliala ' + averageMoodEmoji + '</h2>';

// series ja chartin ilmestymis animaatio kaavioon
series.appear(1000);
chart.appear(1000, 100);


// Buttonit vuosi, kuukausi ja viikko
var vuosiButton = document.getElementById('vuosiButton');
var kuukausiButton = document.getElementById('kuukausiButton');
var viikkoButton = document.getElementById('viikkoButton');

// lisätään event listener vuosi buttoniin
vuosiButton.addEventListener('click', function() {
  // Resetoidaan data takaisin alkuperäiseen
  series.data.setAll(seriesData);

  // Calculate the start and end dates for the entire year
  var startDate = new Date(seriesData[0].date);
  startDate.setMonth(0); // January
  startDate.setDate(1); // First day of the year
  var endDate = new Date(seriesData[seriesData.length - 1].date);
  endDate.setMonth(11); // December
  endDate.setDate(31); // Last day of the year

  // Set the x-axis range to cover the entire year
  xAxis.set("min", startDate.getTime());
  xAxis.set("max", endDate.getTime());

  // Calculate the average mood for the entire year
  var totalMood = 0;
  for (var i = 0; i < seriesData.length; i++) {
    totalMood += seriesData[i].value;
  }
  var averageMood = Math.round(totalMood / seriesData.length);

  // Update the mood description with the average mood emoji for the entire year
  var averageMoodEmoji = emojiMap[averageMood];
  document.getElementById('mood-description').innerHTML = '<h2 class="large-emoji">Mieliala ' + averageMoodEmoji + '</h2>';
});


// Lisätään event listeneri kuukausi buttoniin
kuukausiButton.addEventListener('click', function() {
  // lasketaan kuukauden päivät ja kuukauden ensimmäinen päivä
  var endDate = new Date(seriesData[seriesData.length - 1].date);
  var startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
  
  // filteröidään data kuukauden mukaan
  var filteredData = seriesData.filter(function(data) {
    var dataDate = new Date(data.date);
    return dataDate >= startDate && dataDate <= endDate;
  });
  
  // Päivitetään kaavio ja zoomataan kuukauden mukaan
  series.data.setAll(filteredData);
  xAxis.set("min", startDate.getTime());
  xAxis.set("max", endDate.getTime());

  // Lasketaan keskimääräinen mieliala kuukauden datalta
  var totalMood = 0;
  for (var i = 0; i < filteredData.length; i++) {
    totalMood += filteredData[i].value;
  }
  var averageMood = Math.round(totalMood / filteredData.length);

  // Päivitetään mieliala emoji kuukauden keskiarvolla
  var averageMoodEmoji = emojiMap[averageMood];
  document.getElementById('mood-description').innerHTML = '<h2 class="large-emoji">Mieliala ' + averageMoodEmoji + '</h2>';
});

// Lisätään event listeneri viikko buttoniin
viikkoButton.addEventListener('click', function() {
  // Lasketaan viikon päivät ja viikon ensimmäinen päivä
  var endDate = new Date(seriesData[seriesData.length - 1].date);
  var startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 6);
  
  // Filteröidään data viikon mukaan
  var filteredData = seriesData.filter(function(data) {
    var dataDate = new Date(data.date);
    return dataDate >= startDate && dataDate <= endDate;
  });

  // Päivitetään kaavio ja zoomataan viikon mukaan
  series.data.setAll(filteredData);
  xAxis.set("min", startDate.getTime());
  xAxis.set("max", endDate.getTime());

  // Lasketaan keskimääräinen mieliala viikon datalta
  var totalMood = 0;
  for (var i = 0; i < filteredData.length; i++) {
    totalMood += filteredData[i].value;
  }
  var averageMood = Math.round(totalMood / filteredData.length);

  // Päivitetään mieliala emoji viikon keskiarvolla
  var averageMoodEmoji = emojiMap[averageMood];
  document.getElementById('mood-description').innerHTML = '<h2 class="large-emoji">Mieliala ' + averageMoodEmoji + '</h2>';
});









