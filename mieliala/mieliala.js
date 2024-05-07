// Create root element
// Define `seriesData` at the top
var seriesData = [];
var root = am5.Root.new("chartdiv");
var emojiMap = {
  1: "😭",
  2: "😢",
  3: "😐",
  4: "😊",
  5: "😁",
};

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    pinchZoomX: true,
    paddingLeft: 0,
  })
);

// Cursor settings
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none",
}));
cursor.lineY.set("visible", false);

// X-axis settings
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.2,
    baseInterval: {
      timeUnit: "day",
      count: 1,
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true,
    }),
    tooltip: am5.Tooltip.new(root, {}),
  })
);

// Y-axis settings
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom",
    }),
    min: 0,
    max: 5,
  })
);

// Create line series
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}",
    }),
  })
);

// Add bullets to the series
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color("#7b9cff"),
    }),
  });
});

// Add fill to the series
series.fills.template.setAll({
  visible: true,
  fillOpacity: 0.5,
  fill: am5.color("#7b9cff"),
});

// Scrollbar settings
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
}));

// Fetch data from API and update the chart
var user_id = localStorage.getItem("user_id");
var token = localStorage.getItem("token");

if (isNaN(user_id) || !user_id) {
  console.error("user_id is not a valid number or not available");
} else {
  fetch("http://localhost:3000/api/entries/" + user_id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((fetchedData) => {
      console.log("Data:", fetchedData); // Debugging fetched data

    // Sort fetchedData by entry_date
    fetchedData.sort((a, b) => new Date(a.entry_date) - new Date(b.entry_date));
    
          // Populate `seriesData` with fetched data
    seriesData = fetchedData.map(entry => ({
      date: new Date(entry.entry_date).getTime(),
      value: entry.mood,
    }));

      series.data.setAll(seriesData);

      // Calculate average mood, skipping null values
      var totalMood = 0;
      var moodCount = 0;
      for (var i = 0; i < fetchedData.length; i++) {
        if (fetchedData[i].mood !== null) {
          totalMood += fetchedData[i].mood;
          moodCount++;
        }
      }
      var averageMood = Math.round(totalMood / moodCount);


      var averageMoodEmoji = emojiMap[averageMood];

      document.getElementById("mood-description").innerHTML =
        '<h2 class="large-emoji">Mieliala ' + averageMoodEmoji + "</h2>";
    })
    .catch((error) => {
      console.error("Fetch operation failed:", error);
    });
}

// Event listeners for the year, month, and week buttons
var vuosiButton = document.getElementById("vuosiButton");
var kuukausiButton = document.getElementById("kuukausiButton");
var viikkoButton = document.getElementById("viikkoButton");

// Year button event listener
vuosiButton.addEventListener("click", function () {
  var startDate = new Date(seriesData[0].date);
  startDate.setMonth(0); // January
  startDate.setDate(1);

  var endDate = new Date(seriesData[seriesData.length - 1].date);
  endDate.setMonth(11); // December
  endDate.setDate(31);

  xAxis.set("min", startDate.getTime());
  xAxis.set("max", endDate.getTime());

  series.data.setAll(seriesData);

  // Update average mood for the year
  var totalMood = 0;
  var moodCount = 0;
  for (var i = 0; i < seriesData.length; i++) {
    if (seriesData[i].value !== null) {
      totalMood += seriesData[i].value;
      moodCount++;
    }
  }
  var averageMood = Math.round(totalMood / moodCount);

  var averageMoodEmoji = emojiMap[averageMood];
  document.getElementById("mood-description").innerHTML =
    '<h2 class="large-emoji">Mieliala ' + averageMoodEmoji + "</h2>";
});

// Month button event listener
kuukausiButton.addEventListener("click", function () {
  var endDate = new Date(seriesData[seriesData.length - 1].date);
  var startDate = new Date(endDate);
  startDate.setMonth(endDate.getMonth() - 1); // Last month

  var filteredData = seriesData.filter((data) => {
    var dataDate = new Date(data.date);
    return dataDate >= startDate && dataDate <= endDate;
  });

  series.data.setAll(filteredData);
  xAxis.set("min", startDate.getTime());
  xAxis.set("max", endDate.getTime());

  // Update average mood for the month
  var totalMood = 0;
  var moodCount = 0;
  for (var i = 0; i < filteredData.length; i++) {
    if (filteredData[i].value !== null) {
      totalMood += filteredData[i].value;
      moodCount++;
    }
  }
  var averageMood = Math.round(totalMood / moodCount);

  var averageMoodEmoji = emojiMap[averageMood];
  document.getElementById("mood-description").innerHTML =
    '<h2 class="large-emoji">Mieliala ' + averageMoodEmoji + "</h2>";
});

// Week button event listener
viikkoButton.addEventListener("click", function () {
  var endDate = new Date(seriesData[seriesData.length - 1].date);
  var startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 6); // Last 7 days

  var filteredData = seriesData.filter((data) => {
    var dataDate = new Date(data.date);
    return dataDate >= startDate && dataDate <= endDate;
  });

  series.data.setAll(filteredData);
  xAxis.set("min", startDate.getTime());
  xAxis.set("max", endDate.getTime());

  // Update average mood for the week
  var totalMood = 0;
  var moodCount = 0;
  for (var i = 0; i < filteredData.length; i++) {
    if (filteredData[i].value !== null) {
      totalMood += filteredData[i].value;
      moodCount++;
    }
  }
  var averageMood = Math.round(totalMood / moodCount);

  var averageMoodEmoji = emojiMap[averageMood];
  document.getElementById("mood-description").innerHTML =
    '<h2 class="large-emoji">Mieliala ' + averageMoodEmoji + "</h2>";
});

// Button for browsing previous weeks
var previousWeekButton = document.getElementById("previousWeekButton");

// Event listener for previous week button
previousWeekButton.addEventListener("click", function () {
  var startDate = new Date(xAxis.get("min"));
  var endDate = new Date(xAxis.get("max"));

  var previousWeekStartDate = new Date(startDate);
  previousWeekStartDate.setDate(startDate.getDate() - 7);

  var previousWeekEndDate = new Date(endDate);
  previousWeekEndDate.setDate(endDate.getDate() - 7);

  var filteredData = seriesData.filter((data) => {
    var dataDate = new Date(data.date);
    return dataDate >= previousWeekStartDate && dataDate <= previousWeekEndDate;
  });

  series.data.setAll(filteredData);

  xAxis.set("min", previousWeekStartDate.getTime());
  xAxis.set("max", previousWeekEndDate.getTime());

  // Calculate the average mood for the previous week
  var totalMood = 0;
  var moodCount = 0;
  for (var i = 0; i < filteredData.length; i++) {
    if (filteredData[i].value !== null) {
      totalMood += filteredData[i].value;
      moodCount++;
    }
  }

  var averageMood = Math.round(totalMood / moodCount);

  var averageMoodEmoji = emojiMap[averageMood];
  document.getElementById("mood-description").innerHTML =
    '<h2 class="large-emoji">Mieliala ' + averageMoodEmoji + "</h2>";
});

// Button for browsing next weeks
var nextWeekButton = document.getElementById("nextWeekButton");

// Event listener for next week button
nextWeekButton.addEventListener("click", function () {
  var startDate = new Date(xAxis.get("min"));
  var endDate = new Date(xAxis.get("max"));

  var nextWeekStartDate = new Date(startDate);
  nextWeekStartDate.setDate(startDate.getDate() + 7);

  var nextWeekEndDate = new Date(endDate);
  nextWeekEndDate.setDate(endDate.getDate() + 7);

  var filteredData = seriesData.filter((data) => {
    var dataDate = new Date(data.date);
    return dataDate >= nextWeekStartDate && dataDate <= nextWeekEndDate;
  });

  series.data.setAll(filteredData);

  xAxis.set("min", nextWeekStartDate.getTime());
  xAxis.set("max", nextWeekEndDate.getTime());

  // Calculate the average mood for the next week
  var totalMood = 0;
  var moodCount = 0;
  for (var i = 0; i < filteredData.length; i++) {
    if (filteredData[i].value !== null) {
      totalMood += filteredData[i].value;
      moodCount++;
    }
  }

  var averageMood = Math.round(totalMood / moodCount);

  var averageMoodEmoji = emojiMap[averageMood];
  document.getElementById("mood-description").innerHTML =
    '<h2 class="large-emoji">Mieliala ' + averageMoodEmoji + "</h2>";
});

series.appear(1000);
chart.appear(1000, 100);