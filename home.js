// Importing fetchData function from fetch.js module
import { fetchData } from './fetch.js';

// Function to update the scale based on slider value
function updateScale() {
    const slider = document.getElementById("slider");
    const value = parseInt(slider.value);
    console.log(value);
    const indicator = document.getElementById("indicator");
    const sliderValue = document.getElementById("sliderValue");
    const readiness = document.getElementById("readiness"); // Assuming there's an element with id "readiness" to display readiness level
    const lifeaid = document.getElementById("lifeaid");
    const lifeotsikko = document.getElementById("lifeotsikko");

    sliderValue.textContent = value; // Update the content of <h1> tag
    indicator.style.width = value + "%";
    indicator.style.backgroundColor = value == 0 ? "white" : "black";

    if (value < 30) {
        readiness.textContent = "Huono";
        lifeotsikko.textContent = "Ota tänään iisisti, kehosi tarvitsee lepoa ja rauhaa.";
        lifeaid.textContent = "Korkea stressitaso, heikko uni ja tasapainottomuus autonomisessa hermostossa voivat vaikuttaa HRV:ään. Muista keskittyä rentoutumiseen, parantaa unen laatua ja ylläpitää terveellisiä elämäntapoja.";
    } else if (value >= 30 && value < 50) {
        readiness.textContent = "Kohtalainen";
        lifeotsikko.textContent = "Kiinnitä huomiota rentoutumiseen ja terveellisiin elämäntapoihin päivän aikana.";
        lifeaid.textContent = "Kohtalainen HRV-vaihtelu saattaa viitata jonkinlaiseen autonomisen hermoston epätasapainoon. Huomioi stressinlievitys, säännöllinen liikunta ja tasapainoinen ruokavalio parantaaksesi tilannetta.";
    } else if (value >= 50 && value < 75) {
        readiness.textContent = "Hyvä";
        lifeotsikko.textContent = "Nauti päivästä ja jatka terveellisten tapojen ylläpitämistä.";
        lifeaid.textContent = "Hyvä HRV-vaihtelu viittaa tasapainoiseen autonomiseen hermostoon ja terveeseen stressivasteeseen. Jatka terveellisten elämäntapojen ylläpitämistä, kuten säännöllistä liikuntaa ja stressinhallintaa, pitääksesi tämän tason HRV:n.";
    } else {
        readiness.textContent = "Erinomainen";
        lifeotsikko.textContent = "Voit hyvin! Jatka terveellisten elämäntapojen ylläpitämistä ja nauti energisestä päivästä.";
        lifeaid.textContent = "Erinomainen HRV-vaihtelu osoittaa erityisen tasapainoisen autonomisen hermoston ja vahvan stressinsietokyvyn. Jatka terveellisiä elämäntapoja ylläpitääksesi tätä optimaalista tilaa ja kokonaisvaltaista hyvinvointia.";
    }
}

// Function to show information window
function showInfo() {
    const infoWindow = document.getElementById("infoWindow");
    infoWindow.style.display = "block";
}

// Function to close information window
function closeInfoWindow() {
    const infoWindow = document.getElementById("infoWindow");
    infoWindow.style.display = "none";
}

// Function to update readiness asynchronously
async function updateReadiness() {
    const id = localStorage.getItem('userID');
    console.log('Getting individual entries for ID:', id);
    
    const url = `http://127.0.0.1:3000/api/readiness`;
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
        const data = await fetchData(url, options);
        console.log(data);
        
        // Assuming data is an object with a property 'readiness'
        const readinessValue = data.readiness;
        const sliderValueElement = document.getElementById('sliderValue');
        sliderValueElement.textContent = readinessValue; // Update the content of the <h1> element
    } catch (error) {
        console.error('Error fetching data:', error);
    } 
}


updateReadiness()

// Attach event listener to call updateScale when input value changes
document.getElementById("slider").addEventListener("change", updateScale);

// Exporting functions to make them accessible from outside
export { updateScale, showInfo, closeInfoWindow, updateReadiness };
