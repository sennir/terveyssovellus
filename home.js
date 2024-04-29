// Importing fetchData function from fetch.js module
import { fetchData } from './fetch.js';

async function updateScale() {
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

        const readinessValue = data.readiness;
        const indicator = document.getElementById("indicator");
        const sliderValue = document.getElementById("sliderValue");
        const readiness = document.getElementById("readiness");
        const lifeaid = document.getElementById("lifeaid");
        const lifeotsikko = document.getElementById("lifeotsikko");

        sliderValue.textContent = readinessValue;
        indicator.style.width = readinessValue + "%";
        indicator.style.backgroundColor = readinessValue == 0 ? "white" : "black";

        if (readinessValue < 30) {
            readiness.textContent = "Huono";
            lifeotsikko.textContent = "Ota tänään iisisti, kehosi tarvitsee lepoa ja rauhaa.";
            lifeaid.textContent = "Korkea stressitaso, heikko uni ja tasapainottomuus autonomisessa hermostossa voivat vaikuttaa HRV:ään. Muista keskittyä rentoutumiseen, parantaa unen laatua ja ylläpitää terveellisiä elämäntapoja.";
        } else if (readinessValue >= 30 && readinessValue < 50) {
            readiness.textContent = "Kohtalainen";
            lifeotsikko.textContent = "Kiinnitä huomiota rentoutumiseen ja terveellisiin elämäntapoihin päivän aikana.";
            lifeaid.textContent = "Kohtalainen HRV-vaihtelu saattaa viitata jonkinlaiseen autonomisen hermoston epätasapainoon. Huomioi stressinlievitys, säännöllinen liikunta ja tasapainoinen ruokavalio parantaaksesi tilannetta.";
        } else if (readinessValue >= 50 && readinessValue < 75) {
            readiness.textContent = "Hyvä";
            lifeotsikko.textContent = "Nauti päivästä ja jatka terveellisten tapojen ylläpitämistä.";
            lifeaid.textContent = "Hyvä HRV-vaihtelu viittaa tasapainoiseen autonomiseen hermostoon ja terveeseen stressivasteeseen. Jatka terveellisten elämäntapojen ylläpitämistä, kuten säännöllistä liikuntaa ja stressinhallintaa, pitääksesi tämän tason HRV:n.";
        } else {
            readiness.textContent = "Erinomainen";
            lifeotsikko.textContent = "Voit hyvin! Jatka terveellisten elämäntapojen ylläpitämistä ja nauti energisestä päivästä.";
            lifeaid.textContent = "Erinomainen HRV-vaihtelu osoittaa erityisen tasapainoisen autonomisen hermoston ja vahvan stressinsietokyvyn. Jatka terveellisiä elämäntapoja ylläpitääksesi tätä optimaalista tilaa ja kokonaisvaltaista hyvinvointia.";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } 
}

updateScale()

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

// Exporting functions to make them accessible from outside
export { updateScale, showInfo, closeInfoWindow};