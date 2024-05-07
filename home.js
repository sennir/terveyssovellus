// Importing fetchData function from fetch.js module
import { fetchData } from './fetch.js';

const valmius = document.querySelector(".valmius");
const indicator = document.querySelector(".indicator");
const sliderValue = document.querySelector(".sliderValue");
const readinesstext = document.querySelector("#readiness");

async function updateName() {
    const url = `http://127.0.0.1:3000/api/kubios/user-info`;
    const token = localStorage.getItem('token');
    
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const data = await fetchData(url, options);
        const firstname = data.user.given_name;

        const firstNameElement = document.getElementById('firstname');
        if (firstNameElement) {
            firstNameElement.textContent = 'Hei ' + firstname + '!';
        } else {
            console.error('Element with id "firstname" not found');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } 
}




async function updateScale() {
    const url = `http://127.0.0.1:3000/api/kubios/user-data`;
    const token = localStorage.getItem('token');
    
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    try {
        console.log(options, url);
        const data = await fetchData(url, options);
        console.log('Readiness:', data.results[0].result.readiness);

        // const readinessValue = data.results[0].result.readiness;
        const readinessValue = 75;
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
            valmius.style.backgroundImage = "url(sade.jpg)";
            indicator.style.backgroundColor = "white";
        } else if (readinessValue >= 30 && readinessValue < 50) {
            readiness.textContent = "Kohtalainen";
            lifeotsikko.textContent = "Kiinnitä huomiota rentoutumiseen ja terveellisiin elämäntapoihin päivän aikana.";
            lifeaid.textContent = "Kohtalainen HRV-vaihtelu saattaa viitata jonkinlaiseen autonomisen hermoston epätasapainoon. Huomioi stressinlievitys, säännöllinen liikunta ja tasapainoinen ruokavalio parantaaksesi tilannetta.";
            valmius.style.backgroundImage = "url(palmu.jpg)";
            indicator.style.backgroundColor = "white";
        } else if (readinessValue >= 50 && readinessValue < 75) {
            readiness.textContent = "Hyvä";
            lifeotsikko.textContent = "Nauti päivästä ja jatka terveellisten tapojen ylläpitämistä.";
            lifeaid.textContent = "Hyvä HRV-vaihtelu viittaa tasapainoiseen autonomiseen hermostoon ja terveeseen stressivasteeseen. Jatka terveellisten elämäntapojen ylläpitämistä, kuten säännöllistä liikuntaa ja stressinhallintaa, pitääksesi tämän tason HRV:n.";
            valmius.style.backgroundImage = "url(erinomainen.jpg)";
            sliderValue.style.color = "black";
            readinesstext.style.color = "black";

        } else {
            readiness.textContent = "Erinomainen";
            lifeotsikko.textContent = "Voit hyvin! Jatka terveellisten elämäntapojen ylläpitämistä ja nauti energisestä päivästä.";
            lifeaid.textContent = "Erinomainen HRV-vaihtelu osoittaa erityisen tasapainoisen autonomisen hermoston ja vahvan stressinsietokyvyn. Jatka terveellisiä elämäntapoja ylläpitääksesi tätä optimaalista tilaa ja kokonaisvaltaista hyvinvointia.";
            valmius.style.backgroundImage = "url(kohtalainen.jpg)";
            sliderValue.style.color = "black";
            readinesstext.style.color = "black";

        }

    } catch (error) {
        console.error('Error fetching data:', error);
    } 
}
updateName()
updateScale()

// Get the button element by its ID
const diarynappi = document.getElementById('paivakirja-button');

// Add click event listener to the button
diarynappi.addEventListener('click', function() {
    console.log('nappi painettu!!!');
    // Redirect to the specified URL when the button is clicked
    window.location.href = "/terveyssovellus/päiväkirjamerkintä/päiväkirjamerkintä.html";
});

// Function to show information window
function showInfo() {
    const infoWindow = document.getElementById("infoWindow");
    infoWindow.style.display = "block";
}

// Attach showInfo to the window object
window.showInfo = showInfo;

// Function to close information window
function closeInfoWindow() {
    const infoWindow = document.getElementById("infoWindow");
    infoWindow.style.display = "none";
}
// Attach closeInfoWindow to the window object
window.closeInfoWindow = closeInfoWindow;

// Exporting functions to make them accessible from outside
export { updateScale, showInfo, closeInfoWindow};