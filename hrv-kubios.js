import { fetchData } from './fetch.js';
let data;
let hrvList; // Define hrvList in an accessible scope

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
        }

        // Now, hrvList contains all the values from the loop
        console.log('HRV List:', hrvList);

        // Call the draw function after fetching the data
        draw();

    } catch (error) {
        console.error('Error fetching data:', error);
    } 

    function draw() {
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

        xAxis.data.setAll(hrvList);

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
        series.data.setAll(hrvList);

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


            // Map the average mood to an emoji
            var emojiMap = {
                1: '😭', // Emoji for value 1
                2: '😢', // Emoji for value 2
                3: '😐', // Emoji for value 3
                4: '😊', // Emoji for value 4
                5: '😁'  // Emoji for value 5
            };
        });
    }
}

updateScale();
