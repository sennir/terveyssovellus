///Valmius mittarin coodi, vielä tällähetkellä mocki datalla mutta koitan yhdistää sen cubioksen arvoihin.

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

/// Funktio Info nappulalle, sylkee ulos infotekstiä hrv:stä

///avaa ikkunen

function showInfo() {
    const infoWindow = document.getElementById("infoWindow");
    infoWindow.style.display = "block";
}

///sulkee ikkunan

function closeInfoWindow() {
    const infoWindow = document.getElementById("infoWindow");
    infoWindow.style.display = "none";
}


