import { fetchData } from './fetch.js';
let hrvList; // Define hrvList in an accessible scope
let startDate; // Declare startDate as a global variable
let dayList = [];
const mockHRVValues = [60, 70, 65, 80, 75, 85, 90];
let data;

// Generate 50 random values between 100 and 200
// for (let i = 0; i < 150; i++) {
//     const randomValue = Math.floor(Math.random() * (200 - 100 + 1) + 100);
//     mockHRVValues.push(randomValue);
// }

async function updateScale() {
    const id = localStorage.getItem('userID');
    console.log('Getting individual entries for ID:', id);
    
    const url = `http://127.0.0.1:3000/api/kubios/user-data`;
    const token = localStorage.getItem('token');
    console.log('haetaan tietoa');
    
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    try {
        console.log(options, url);
        data = await fetchData(url, options);
        console.log(data);
        // Initialize an empty array to store the values
        hrvList = [];

        for (let i = 0; i < data.results.length; i++) {
            // Push the value into the array
            console.log(i);
            hrvList.push(data.results[i].result.sd1_ms);
            console.log(data.results[i].result.sd1_ms);
            console.log(data.results[i].daily_result);
            dayList.push(new Date(data.results[i].daily_result));
            console.log(dayList)


        }
       
        // Concatenate mock values with real values
        //MOKKI DATA VERSIO POISTA KOMMENTTI
        // hrvList = hrvList.concat(mockHRVValues);

        // Set the startDate based on the fetched date
        startDate = new Date(data.results[0].daily_result);

        // Update x-axis configuration
        xAxis.set("min", startDate.getTime());

        

        // Now, hrvList contains all the values from the loop
        console.log('HRV List:', hrvList);


    } catch (error) {
        console.error('Error fetching data:', error);
    } 

};



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
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX",
  pinchZoomX: true,
  paddingLeft: 0
}));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineX.set("forceHidden", true);
cursor.lineY.set("forceHidden", true);


function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true,
    minGridDistance: 90
  })
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
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

series.fills.template.setAll({
  fillOpacity: 0.2,
  visible: true
});


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
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

// DRAGGABLE RANGE
// add series range
var rangeDataItem = yAxis.makeDataItem({});
yAxis.createAxisRange(rangeDataItem);

// create container for all elements, you can put anything you want top it
var container = am5.Container.new(root, {
  centerY: am5.p50,
  draggable: true,
  layout: root.horizontalLayout
})

// restrict from being dragged vertically
container.adapters.add("x", function() {
  return 0;
});

// restrict from being dragged outside of plot
container.adapters.add("y", function(y) {
  return Math.max(0, Math.min(chart.plotContainer.height(), y));
});

// change range when y changes
container.events.on("dragged", function() {
  updateLabel();
});

// this is needed for the bullets to be interactive, above the plot
yAxis.topGridContainer.children.push(container);

// create bullet and set container as a bullets sprite
rangeDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: container
}));

// decorate grid of a range
rangeDataItem.get("grid").setAll({
  strokeOpacity: 1,
  visible: true,
  stroke: am5.color(0x000000),
  strokeDasharray: [2, 2]
})

// create background for the container
var background = am5.RoundedRectangle.new(root, {
  fill: am5.color(0xffffff),
  fillOpacity: 1,
  strokeOpacity: 0.5,
  cornerRadiusTL: 0,
  cornerRadiusBL: 0,
  cursorOverStyle: "ns-resize",
  stroke: am5.color(0xff0000)
})

container.set("background", background);

// add label to container, this one will show value and text
var label = container.children.push(am5.Label.new(root, {
  paddingTop: 5,
  paddingBottom: 5
}))

// add x button 
var xButton = container.children.push(am5.Button.new(root, {
  cursorOverStyle: "pointer",
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 2,
  paddingRight: 8
}))

// add label to the button (you can add icon instead of a label)
xButton.set("label", am5.Label.new(root, {
  text: "X",
  paddingBottom: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingLeft: 0,
  fill: am5.color(0xff0000)
}))

// modify background of x button
xButton.get("background").setAll({
  strokeOpacity: 0,
  fillOpacity: 0
})

// dispose item when x button is clicked
xButton.events.on("click", function() {
  yAxis.disposeDataItem(rangeDataItem);
})

function updateLabel(value) {
  var y = container.y();
  var position = yAxis.toAxisPosition(y / chart.plotContainer.height());

  if(value == null){
    value = yAxis.positionToValue(position);
  }

  label.set("text", root.numberFormatter.format(value, "#.00") + ">Stop loss");

  rangeDataItem.set("value", value);
}

// when data is validated, set range value to the middle
series.events.on("datavalidated", () => {
  var max = yAxis.getPrivate("max", 1);
  var min = yAxis.getPrivate("min", 0);

  var value = min + (max - min) / 2;
  rangeDataItem.set("value", value);
  updateLabel(value);
})

//MOKKI DATA VERSIO POISTA KOMMENTTI

// updateScale().then(() => {
//     // Set data to your hrvList instead of generating random data
//     series.data.setAll(hrvList.map((value, index) => ({
//         date: startDate.getTime() + index * 86400000, // Assuming a day interval
//         value: value
//     })));
// }).catch(error => {
//     console.error('Error fetching data:', error);
// });

//If we use real data 

updateScale().then(() => {
    //Set data to your hrvList instead of generating random data
    series.data.setAll(hrvList.map((value, index) => ({
    date: dayList[index].getTime(), // Using dayList as x-axis values
    value: value
  })));
}).catch(error => {
  console.error('Error fetching data:', error);
});




  
// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);

// Assuming you have a button element in your HTML with the id "showWeekButton"
const showWeekButton = document.getElementById("viikkoButton");

// Function to filter data for the current week
function filterCurrentWeekData() {
  // Get the current date
  const currentDate = new Date();

  // Calculate the start date of the current week (Sunday)
  const firstDayOfWeek = new Date(currentDate);
  firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  // Calculate the end date of the current week (Saturday)
  const lastDayOfWeek = new Date(currentDate);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

  // Filter the data to include only values within the current week
  const filteredData = hrvList.filter(data => {
    const dataDate = new Date(data.date);
    return dataDate >= firstDayOfWeek && dataDate <= lastDayOfWeek;
  });

  // Update the chart with the filtered data
  series.data.setAll(filteredData);
}

// Add click event listener to the button
showWeekButton.addEventListener("click", filterCurrentWeekData);



